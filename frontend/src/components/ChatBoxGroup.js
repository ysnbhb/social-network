"use client";
// import "../styles/chat.css";
import "../styles/chatgroup.css";
import { useEffect, useState } from "react";
import { sendMessageGroupeIsRead } from "@/websocket/messages";
import { sendMessageGroup } from "@/websocket/messages";
export default function ChatBoxGroup({ groupid }) {
    sendMessageGroupeIsRead(groupid);
    const [newMessage, setNewMessage] = useState("");
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
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

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setNewMessage("");
            sendMessageGroup(groupid, newMessage);
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
        <div className="chat-container-group">
            <div className="chat-header-group">
                <div className="group-info">
                    <span id="title-chat-group"></span>
                </div>
            </div>

            <div className="chat-messages-group" id="messages"></div>

            <div className="chat-input-group">
                <div className="input-field-group">
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