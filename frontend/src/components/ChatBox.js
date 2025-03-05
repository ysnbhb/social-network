import React, { useState, useEffect } from "react";
import { sendMessageuser } from "../websocket/messages.js";
import '../styles/chat.css';
import { useRouter } from "next/navigation";

function ChatBox({ user }) {
  const [newMessage, setNewMessage] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const Router = useRouter();
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
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
  if (isMobile) {
    if (Router.pathname !== "/chat") {
      if (document.querySelector(".user-list")) {
        console.log("1");
        document.querySelector(".user-list").style.display = "none";;
      }
    } else {
      if (document.querySelector(".user-list")) {
        console.log("2");
        document.querySelector(".user-list").style.display = "block";;
      }
    }
  } else if (!isMobile) {
    if (document.querySelector(".user-list")) {
      console.log("3");
      document.querySelector(".user-list").style.display = "block";;
    }
  }
  const handleGoBack = () => {
    Router.push('/chat');
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setNewMessage("");
      sendMessageuser([`${user.nickname}`], newMessage);
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(newMessage + emoji);
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  window.addEventListener("click", () => {
    setEmojiPickerVisible(false);
  })

  return (
    <div className="chat-container" id={`chat-box-${user.nickname}`}>
      <div className="chat-header">
        <div className="user-info">
          {isMobile && (
            <button className="back-button" onClick={handleGoBack}>
              &#8592;
            </button>
          )}
          <div className="avatar">
            <img src={`${user.avatar}`} alt="Post" />
          </div>
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

          <button onClick={(e) => (
            e.stopPropagation(),
            toggleEmojiPicker()
          )}>😊</button>

          {emojiPickerVisible && (
            <div className="emoji-picker">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="emoji-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmojiClick(emoji)
                  }}
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
