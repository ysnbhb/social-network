"use client";
import React, { useState } from "react";
import UserList from "../../components/UserList";
import ChatBox from "../../components/ChatBox";
import '../../styles/chat.css';

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat-container">
      <UserList setSelectedUser={setSelectedUser} />
      {selectedUser ? (
        <ChatBox user={selectedUser} />
      ) : (
        <div className="select-user">Select a user to start chatting</div>
      )}
    </div>
  );
};

export default Chat;
