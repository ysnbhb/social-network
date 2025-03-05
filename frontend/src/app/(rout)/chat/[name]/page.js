"use client";
import { use } from "react";
import React, { useState, useEffect } from "react";
import UserList from "../../../../components/UserList";
import ChatBox from "../../../../components/ChatBox";
import { sendGetmessagesusers, sendMessageIsRead } from "../../../../websocket/messages.js";
import { useRouter } from "next/navigation";
export default function ChatPage({ params }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const { name } = use(params)
    const router = useRouter();
    
    useEffect(() => {
        if (name) {
            fetch(`/api/user/info?username=${name}`, {
                method: 'GET',
                credentials: 'include'
            })

                .then((response) => {
                    if (!response.ok) {
                        router.replace('/pageNotfoud');
                    }
                    return response.json()
                })
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
        <main className="main-content-chat">
            <UserList />
            {selectedUser ? (
                <ChatBox user={selectedUser} />
            ) : (
                <div className="select-user">Loading conversation with {name}...</div>
            )}
        </main>
    );
}