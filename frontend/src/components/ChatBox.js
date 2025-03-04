import React, { useState } from "react";
import { sendMessageuser } from "../websocket/messages.js";
import '../styles/chat.css';

function ChatBox({ user }) {
  const [newMessage, setNewMessage] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  // Emoji list
  const emojis = [
    "😀", "😂", "😍", "😎", "😢", "😡", "👍", "👋", "🙏", 
    "😃", "😄", "😁", "😆", "😅", "😜", "😝", "😛", "😋", 
    "😊", "😇", "😎", "🥺", "🥰", "😱", "😤", "😬", "😯", 
    "😳", "😵", "🤔", "😶", "🤩", "🥳", "🤗", "🤤", "😴", 
    "🤒", "🤕", "🥶", "🥵", "🥴", "😷", "💩", "💥", "💫", 
    "⭐", "🌟", "✨", "🌈", "🔥", "🌹", "💐", "🌻", "🌼", 
    "🌸", "💖", "💓", "💗", "💙", "💚", "💛", "💜", "🤍", 
    "🤎", "❤️", "💋", "👑", "👻", "💀", "🎃", "👽", "👾", 
    "🎮", "🎲", "🧸", "🎉", "🎈", "🎁", "🎂", "🍰", "🍩", 
    "🍪", "🍫", "🍬", "🍒", "🍉", "🍓", "🍍", "🍑", "🍊", 
    "🍋", "🍈", "🥥", "🥝", "🍇", "🍏", "🍎", "🍊", "🍌"
  ];
     

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setNewMessage("");  // Reset message input
      sendMessageuser([`${user.nickname}`], newMessage);  // Send message
    }
  };

  // Add emoji to the message
  const handleEmojiClick = (emoji) => {
    setNewMessage(newMessage + emoji);  // Append emoji to the message
  };

  // Toggle emoji picker visibility
  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  return (
    <div className="chat-container" id={`chat-box-${user.nickname}`}>
      <div className="chat-header">
        <div className="user-info">
          <div className="avatar"></div>
          <span>{user.nickname}</span>
        </div>
      </div>

      <div className="chat-messages" id="messages"></div>

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
          
          {/* Emoji button */}
          <button onClick={toggleEmojiPicker}>😊</button>

          {/* Emoji picker */}
          {emojiPickerVisible && (
            <div className="emoji-picker">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="emoji-btn"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
