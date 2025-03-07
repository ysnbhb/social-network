"use client"
import { sendGetmessagesgroups } from "@/websocket/messages";
import ChatBoxGroup from "../../../../../components/ChatBoxGroup";
import { use } from "react";
export default function Page({ params }) {
    const { id } = use(params)
    sendGetmessagesgroups(id);
    return (
        <main className="main-content-chat">
            <ChatBoxGroup groupid={id} />
        </main>
    );
}