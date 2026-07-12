import { useState, useEffect, useRef } from "react";
import useUser from "../../../../context/auth/AuthContext";

export default function useChat(contactId, messages, token) {
  const [chatMessages, setChatMessages] = useState([...messages]);
  const { user } = useUser();
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    setChatMessages([...messages]);
  }, [contactId, messages]);

  useEffect(() => {
    const connectWebSocket = () => {
      console.log("Attempting WebSocket connection...");

      // 1. Resolve host domain from environment or fallback to local development
      // Strip out 'http://' or 'https://' from VITE_APP_URL if provided
      const rawApiUrl = import.meta.env.VITE_API_URL || "localhost:8000";
      const cleanHost = rawApiUrl.replace(/^https?:\/\//, "");

      // 2. Select protocol based on the scheme (wss:// for safe production, ws:// for development)
      const wsScheme = rawApiUrl.startsWith("https") ? "wss" : "ws";

      // 3. Construct URL dynamically
      const wsUrl = `${wsScheme}://${cleanHost}/private/messages/ws/chat/${contactId}/?token=${token}`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connection established:", wsUrl);
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);
        setChatMessages((prevMessages) => [...prevMessages, message]);
      };

      ws.onclose = (event) => {
        if (event.wasClean) {
          console.log(`Connection closed cleanly, code=${event.code}`);
        } else {
          console.log("Connection died. Scheduling reconnect...");
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 5000);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket encountered an error:", error);
      };
    };

    // Only establish a connection if vital properties are ready
    if (contactId && token) {
      connectWebSocket();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [contactId, token]);

  const sendMessage = (content, receiver) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const payload = {
        content: content,
        receiver: parseInt(receiver),
      };
      wsRef.current.send(JSON.stringify(payload));
      console.log("Sent message:", payload);
    } else {
      console.error("Cannot send message. WebSocket is not open.");
    }
  };

  return { chatMessages, sendMessage };
}
