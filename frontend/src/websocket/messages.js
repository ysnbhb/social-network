"use client"
import { safeSend } from "./websocket.js";
import { sendNotification } from "./notification.js";

export function Getmessagesusers(data) {
    const messages = data.messages;
    const messageplace = document.getElementById("messages");
    const usernickname = document.querySelectorAll(".user-info span")[0].textContent;

    messageplace.innerHTML = "";
    if (messageplace && messages) {
        messages.forEach(info => {
            messageplace.innerHTML += `
                <div class="message ${info.sender === usernickname ? "sender" : "receiver"}">
                    <div class="sender-info">
                    <div class="avatar"></div>
                    <span>${info.sender}</span>
                    <span class="time">${info.timestamp}</span>
                    </div>
                    <div>${info.message}</div> 
                </div>
                `;
        })
    }

}
export function receiveMessageuser(data) {
    sendNotification()
    if (document.getElementById(`chat-box-${data.sender}`) && !data.mymsg) {
        sendMessageIsRead(data.sender)
    }
    if (!document.getElementById(`chat-box-${data.sender}`) && !data.mymsg ) {
        const newmsg = document.getElementById(`notification-badge-${data.sender}`)
        if (newmsg){
            newmsg.style.display = "block"
        }
    }
    const messageplace = document.getElementById("messages");
 
    if (messageplace) {
        const usernickname = document.querySelectorAll(".user-info span")[0].textContent;
        messageplace.innerHTML += `
             <div class="message ${data.sender === usernickname ? "sender" : "receiver"}">
                    <div class="sender-info">
                    <div class="avatar"></div>
                    <span>${data.sender}</span>
                    <span class="time">${data.time}</span>
                    </div>
                    <div>${data.content}</div> 
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
    sendNotification()
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
