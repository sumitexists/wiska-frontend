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
      const ws = new WebSocket(
        `ws://localhost:8000/private/messages/ws/chat/${contactId}/?token=${token}`
      );
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connection established");
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

    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [contactId, token]); // Add token to dependency array if it can change dynamically

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
