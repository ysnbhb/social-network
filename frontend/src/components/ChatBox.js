import React, { useState } from "react";
import { sendMessageuser } from "../websocket/websocket.js";
import '../styles/chat.css';
function ChatBox({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // const input = document.getElementById("message-input")
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
      sendMessageuser("yhamdoun", [`${user.nickname}`], newMessage);
    }
  };

  return (
    <div className="chat-box">
      <h3>Chat with {user.nickname}</h3>
      <div className="messages">
        {messages.length === 0 ? (
          <p>No messages yet. Start the conversation!</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="message">
              <strong>{message.sender}:</strong> {message.text}
            </div>
          ))
        )}
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
