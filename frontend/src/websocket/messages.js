"use client"
import { safeSend } from "./websocket.js";
import { AddNotificationsymbole } from "./notification.js";

export function Getmessagesusers(data) {
    const messages = data.messages;
    const messageplace = document.getElementById("messages");
    messageplace.innerHTML = "";
    if (messageplace && messages) {
        messages.forEach(info => {
            messageplace.innerHTML += `
             <div className="message">
              <strong>${info.sender}:</strong> ${info.message} <br>at ${info.timestamp}
            </div>
            `
        })
    }
}
export function receiveMessageuser(data) {
    const url = (window.location.href).split("/").reverse()[0];
    if (!data.mymsg && url !== "chat") {
        AddNotificationsymbole(true)
    }
    if (document.getElementById(`chat-box-${data.sender}`) && !data.mymsg) {
        sendMessageIsRead(data.sender)
    }
    if (!document.getElementById(`chat-box-${data.sender}`) && !data.mymsg && url === "chat") {
        document.getElementById(`notification-badge-${data.sender}`).style.display = "block"
    }
    const messageplace = document.getElementById("messages");
    if (messageplace) {
        messageplace.innerHTML += `
             <div className="message">
              <strong>${data.sender}:</strong> ${data.content} <br>at ${data.time}
            </div>
            `
    }
}
export function sendMessageuser(receiver, message) {
    const data = {
        type: "messageuser",
        receiver: receiver,
        content: message
    }
    safeSend(data);
}

export function sendGetmessagesusers(receiver) {
    const data = {
        type: "getmessagesusers",
        receiver: receiver,
    }
    safeSend(data);
}
export function sendMessageIsRead(nickname) {
    const data = {
        type: "changeunreadmessage",
        sender: nickname
    }

    document.getElementById(`notification-badge-${nickname}`).style.display = "none"
    safeSend(data);
}
//// group messages ////

export function receiveMessageGroup(data) {
    console.log(data);
}
export function sendMessageGroup(sender, groupid, message) {
    const data = {
        type: "messageGroup",
        sender: sender,
        groupid: groupid,
        content: message
    }
    safeSend(data);
}

export function sendGetmessagesgroups(sender, groupid) {
    const data = {
        type: "getmessagesgroup",
        sender: sender,
        groupid: groupid,
    }
    safeSend(data);
}
export function Getmessagesgroups(data) {
    console.log(data);
}
/// typing ////
export function receiveTyping(data) {
    console.log(data);
}


export function sendTyping(sender, receiver) {
    const data = {
        type: "typing",
        sender: sender,
        receiver: receiver,
        content: `${sender} is typing`
    }
    safeSend(data);
}