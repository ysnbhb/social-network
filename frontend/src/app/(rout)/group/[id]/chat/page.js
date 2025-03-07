"use client"
import ChatBoxGroup from "../../../../../components/ChatBoxGroup";
import { useState, useEffect, use } from "react";
export default function Page({ params }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const { id } = use(params)
    useEffect(() => {
        if (id) {
            fetch(`/api/group/chat?groupid=${id}`, {
                method: 'GET',
                credentials: 'include'
            })

                .then((response) => {
                    if (!response.ok) {
                        console.log("error");

                        // router.replace('/pageNotfoud');
                    }
                    return response.json()
                })
                .then((userData) => {
                    // setSelectedUser(userData);
                    // sendGetmessagesusers([name], 0);
                    // sendMessageIsRead(name);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [id]);
    return (
        <main className="main-content-chat">
            <ChatBoxGroup user={selectedUser} />
        </main>
    );

}