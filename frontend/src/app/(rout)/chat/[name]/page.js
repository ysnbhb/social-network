"use client";
import { use } from "react";
import React, { useState, useEffect } from "react";
import UserList from "../../../../components/UserList";
import ChatBox from "../../../../components/ChatBox";
import { sendGetmessagesusers, sendMessageIsRead } from "../../../../websocket/messages.js";

export default function ChatPage({ params }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const { name } = use(params)

    useEffect(() => {
        if (name) {
            fetch(`/api/user/info?username=${name}`, {
                method: 'GET',
                credentials: 'include'
            })
                .then((response) => response.json())
                .then((userData) => {
                    setSelectedUser(userData);
                    sendGetmessagesusers([name], 0);
                    sendMessageIsRead(name);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [name]);


    return (
        <div>
            <main className="main-content">
                <UserList />
                {selectedUser ? (
                    <ChatBox user={selectedUser} />
                ) : (
                    <div className="select-user">Loading conversation with {name}...</div>
                )}
            </main>
        </div>
    );
}