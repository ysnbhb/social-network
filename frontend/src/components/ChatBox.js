import React, { useState } from "react";
import { sendMessageuser } from "../websocket/messages.js";
import '../styles/chat.css';
function ChatBox({ user }) {

  const [newMessage, setNewMessage] = useState("");
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setNewMessage("");
      sendMessageuser([`${user.nickname}`], newMessage);
    }
  };

  return (
    <div className="chat-box" id={`chat-box-${user.nickname}`}>
      <h3>Chat with {user.nickname}</h3>
      <div className="messages" id="messages">
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          id="message-input"
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};
export default ChatBox;
