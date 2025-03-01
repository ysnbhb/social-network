"use client";
import React, { useState } from "react";
import UserList from "../../../components/UserList";
import ChatBox from "../../../components/ChatBox";
import ActivitySidebar from "../../../components/activitySide";
import style from "../profile/profile.module.css";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const FollowingData = [
    { fullname: "Omar Rharbi", time: "30m", button: "Follow", image: " " },
    {
      fullname: "John Doe",
      time: "1h",
      button: "Follow",
      image: " ",
    },
    {
      fullname: "Jane Smith",
      time: "2h",
      button: "Follow",
      image: " ",
    },
    {
      fullname: "Jane Smith",
      time: "2h",
      button: "Follow",
      image: " ",
    },
  ];
  return (
    
    <div>

      <main className="main-content">
      <UserList setSelectedUser={setSelectedUser} />
      {selectedUser ? (
        <ChatBox user={selectedUser} />
      ) : (
        <div className="select-user">Select a user to start chatting</div>
      )}

    {/* <ActivitySidebar
            className={`${style.ActivitySidebar}`}
            classes={FollowingData}
            title="following"
          /> */}
      </main>
    </div>
  );
};

export default Chat;
