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
    <div className="chat-container" id={`chat-box-${user.nickname}`}>

<div className="chat-header">
            <div className="user-info">
                <div className="avatar">
                </div>
                <span>{user.nickname}</span>
            </div>
        </div>
        
        <div className="chat-messages" id="messages" >

        </div>
        <div className="chat-input">
 
      <div className="input-field">
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
    </div>
  );
};
export default ChatBox;
