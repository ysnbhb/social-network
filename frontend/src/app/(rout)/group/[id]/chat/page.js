"use client"
import { sendGetmessagesgroups } from "@/websocket/messages";
import ChatBoxGroup from "../../../../../components/ChatBoxGroup";
import { use,useEffect } from "react";
export default function Page({ params }) {
    const { id } = use(params)
    useEffect(() => {
        sendGetmessagesgroups(id);
    },[])
    return (
        <main className="main-content-chat">
            <ChatBoxGroup groupid={id} />
        </main>
    );
}