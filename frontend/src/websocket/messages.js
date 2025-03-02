"use client"
import { safeSend } from "./websocket.js";
import { sendNotification } from "./notification.js";

export function Getmessagesusers(data) {
    const messages = data.messages;
    const messageplace = document.getElementById("messages");
    if (messageplace && messages) {
        messageplace.innerHTML = "";
        messages.forEach(info => {
            messageplace.innerHTML += `
                <div class="message ${info.sender !== data.you ? "sender" : "receiver"}">
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
    if (messageplace) {
        messageplace.scrollTo({
            top: messageplace.scrollHeight,
            behavior: 'smooth'
        });
    }
    //GetMoreMessages(data.offset);
}
function GetMoreMessages(offset) {
    const messageplace = document.getElementById("messages");
    messageplace.addEventListener("scroll", () => {
        if (messageplace.scrollTop === 0) {
            sendGetmessagesusers([user.nickname], offset);
        }
    });
}


export function receiveMessageuser(data) {

    sendNotification()
    if (document.getElementById(`chat-box-${data.sender}`) && !data.mymsg) {
        sendMessageIsRead(data.sender)
    }
    if (!document.getElementById(`chat-box-${data.sender}`) && !data.mymsg) {
        const newmsg = document.getElementById(`notification-badge-${data.sender}`)
        if (newmsg) {
            newmsg.style.display = "block"
        }
    }
    console.log(data);
    
    const messageplace = document.getElementById("messages");
    if (window.location.pathname === `/chat/${data.sender}` || data.mymsg) {
        if (messageplace) {
            messageplace.innerHTML += `
             <div class="message ${data.sender !== data.you ? "sender" : "receiver"}">
                    <div class="sender-info">
                    <div class="avatar"></div>
                    <span>${data.sender}</span>
                    <span class="time">${data.time}</span>
                    </div>
                    <div>${data.content}</div> 
                </div>
            `
            messageplace.scrollTo({
                top: messageplace.scrollHeight,
                behavior: 'smooth'
            });

        }
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

export function sendGetmessagesusers(receiver, offset) {
    const data = {
        type: "getmessagesusers",
        receiver: receiver,
        offset: offset
    }
    safeSend(data);
}
export function sendMessageIsRead(nickname) {
    const data = {
        type: "changeunreadmessage",
        sender: nickname
    }
    if (!document.getElementById(`notification-badge-${nickname}`)) {
        return
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
