import ChatField from "./ChatField";
import { useState, useEffect, useRef } from "react";
import ReceiverBlock from "./ReceiverBlock";
import ChatBubble from "./ChatBubble";
import { useLoaderData, useParams } from "react-router-dom";
import { formatMessageTime } from "../utils/utils";
import { sendMessage } from "../../../../services/messageService";
import axios from "axios";
import useUser from "../../../../context/auth/AuthContext";
import useChat from "../hooks/useChat";

// import useChat from "../hooks/useChat";

function ChatRoom() {
  const { user } = useUser();
  const { contactId } = useParams();
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);
  const data = useLoaderData();
  const username = data.contact;
  const token = localStorage.getItem("accessToken");

  // 🚨 RED GUY FIX: Rip out the local useState and useEffect!
  // The 'useChat' engine owns the memory now. We pass 'data.results' 
  // directly into the engine as the starting fuel.
  // We extract exactly what the hook returns: 'messages' and 'sendMessage'.
  const { chatMessages, sendMessage } = useChat(contactId, data.results,token);

  const onSendMessage = async () => {
    if (!message.trim()) return;
    // Our hook's sendMessage only requires the text content, it already knows the contactId!
    sendMessage(message, contactId);
    setMessage("");
  };

  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className=" h-full flex flex-col justify-between">
      <ReceiverBlock receiverUsername={username} />
      <div
        ref={containerRef}
        className="overflow-y-auto scrollbar-none flex flex-col w-full h-full bg-zinc-900"
      >
        {chatMessages &&
          chatMessages.map((msg) => (
            <ChatBubble
              key={msg.id}
              sender={(msg.sender == user.id) ? user.username : username}
              content={msg.content}
              time={formatMessageTime(msg.created_at)}
              isSender={msg.sender == user.id}
            />
          ))}
      </div>
      <ChatField
        onSendMessage={onSendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}
export default ChatRoom;
