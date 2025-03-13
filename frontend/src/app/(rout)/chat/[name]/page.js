"use client";
import { use } from "react";
import React, { useState, useEffect } from "react";
import UserList from "../../../../components/UserList";
import ChatBox from "../../../../components/ChatBox";
import { sendGetmessagesusers, sendMessageIsRead } from "../../../../websocket/messages.js";
import { notFound, useRouter } from "next/navigation";
import { API_URL } from "@/components/api";
export default function ChatPage({ params }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [has , setHas] = useState(true);
    const { name } = use(params)
     
    useEffect(() => {
        if (name) {
            fetch(`${API_URL}/api/user/info?username=${name}`, {
                method: 'GET',
                credentials: 'include'
            })

                .then((response) => {
                    if (!response.ok) {
                        setHas(false);
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
    if (!has) {
        notFound();
    }
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