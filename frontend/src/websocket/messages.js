"use client"
import { safeSend } from "./websocket.js";
import { sendNotification } from "./notification.js";

export function Getmessagesusers(data) {
    const messages = data.messages;
    const messageplace = document.getElementById("messages");

    if (messageplace && messages && messages.length) {
        const oldScrollHeight = messageplace.scrollHeight;

        if (data.offset === 0) {
            messageplace.innerHTML = '';
        }

        const fragment = document.createDocumentFragment();

        messages.forEach(info => {
            const dev = document.createElement("div");
            dev.classList.add("message", info.sender !== data.you ? "sender" : "receiver");
            dev.innerHTML = `
                    <div class="sender-info">
                        <div class="avatar"></div>
                        <span>${info.sender}</span>
                        <span class="time">${info.timestamp}</span>
                    </div>
                    <div>${info.message}</div> 
                `;
            fragment.prepend(dev);
        });

        messageplace.prepend(fragment);
        if (data.offset === 0) {
            messageplace.scrollTo({
                top: messageplace.scrollHeight,
                behavior: 'auto'
            });
        } else {
            messageplace.scrollTo({
                top: messageplace.scrollHeight - oldScrollHeight,
                behavior: 'auto'
            });
        }

        messageplace.dataset.currentOffset = data.offset + messages.length;
        messageplace.dataset.loading = "false";
    }

    setupScrollHandler(data);
}


function setupScrollHandler(data, type = "user") {
    const messageplace = document.getElementById("messages");
    if (!messageplace) return;
    messageplace.addEventListener("scroll", () => {
        if (messageplace.scrollTop === 0 && messageplace.dataset.loading !== "true") {
            const currentOffset = parseInt(messageplace.dataset.currentOffset || 0);
            messageplace.dataset.loading = "true";
            if (type === "user") {
                sendGetmessagesusers([data.he], currentOffset);
            } else {
                sendGetmessagesgroups(data.id, currentOffset);
            }
        }
    });
}

export function receiveMessageuser(data) {
    const updateUserListEvent = new CustomEvent('updateUserList');
    window.dispatchEvent(updateUserListEvent);

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

export function sendGetmessagesusers(receiver, offset = 0) {
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
    const messageplace = document.getElementById("messages");
    if (window.location.pathname === `/group/${data.groupid}/chat` || data.mymsg) {
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
export function sendMessageGroup(groupid, message) {
    const data = {
        type: "messageGroup",
        groupid: parseInt(groupid),
        content: message
    }
    safeSend(data);
}

export function sendGetmessagesgroups(groupid, offset = 0) {

    const data = {
        type: "getmessagesgroup",
        groupid: parseInt(groupid),
        offset: offset
    }
    safeSend(data);
}
export function Getmessagesgroups(data) {
    const title = document.getElementById("title-chat-group")
    title.innerText = data.Groupname
    const messages = data.messages;
    const messageplace = document.getElementById("messages");

    if (messageplace && messages && messages.length > 0) {
        const oldScrollHeight = messageplace.scrollHeight;

        if (data.offset === 0) {
            messageplace.innerHTML = '';
        }

        const fragment = document.createDocumentFragment();

        messages.forEach(info => {
            const dev = document.createElement("div");
            dev.classList.add("message", info.sender !== data.you ? "sender" : "receiver");
            dev.innerHTML = `
                    <div class="sender-info">
                        <img src="${info.avatar_url}" class="avatar"/>
                        <span>${info.sender}</span>
                        <span class="time">${info.timestamp}</span>
                    </div>
                    <div>${info.message}</div> 
                `;
            fragment.prepend(dev);
        });

        messageplace.prepend(fragment);
        if (data.offset === 0) {
            messageplace.scrollTo({
                top: messageplace.scrollHeight,
                behavior: 'auto'
            });
        } else {
            messageplace.scrollTo({
                top: messageplace.scrollHeight - oldScrollHeight,
                behavior: 'auto'
            });
        }

        messageplace.dataset.currentOffset = data.offset + messages.length;
        messageplace.dataset.loading = "false";
    }

    setupScrollHandler(data, "group");
}
