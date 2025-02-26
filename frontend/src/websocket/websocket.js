"use client";

import { receiveFollow, handleNotification, receiveRequestInvitationgroup, receiveAcceptedInvitationGroup, receiveEventCreated, receiveAcceptedInvitationUser } from './notification.js'
import { Getmessagesusers, receiveMessageuser, receiveMessageGroup, receiveTyping, Getmessagesgroups } from './messages.js';

export let socket;
let connectionPromise = null;

function getCookie(name) {
    let cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export function initializeWebSocket() {
    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = new Promise((resolve, reject) => {
        const sessionId = getCookie("session_id");
        socket = new WebSocket(`ws://localhost:8080/ws?session_id=${sessionId}`);

        socket.onopen = function () {
            console.log('WebSocket connection established.');
            resolve(socket);
        };

        socket.onerror = function (error) {
            console.log('Error event:', error);
            reject(error);
        };

        socket.onclose = function (event) {
            console.log('WebSocket connection closed with code:', event.code);
            connectionPromise = null;
        };

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            const type = data.type;
            console.log("Received data:", type);
            
            switch (type) {
                case "onlineStatus":
                    ReceiveOnlineStatus(data);
                    break;
                case "messageuser":
                    receiveMessageuser(data);
                    break;
                case "messageGroup":
                    receiveMessageGroup(data);
                    break;
                case "follow":
                    receiveFollow(data);
                    break;
                case "requestinvitationgroup":
                    receiveRequestInvitationgroup(data);
                    break;
                case "acceptedinvitationgroup":
                    receiveAcceptedInvitationGroup(data);
                    break;
                case "acceptedinvitationuser":
                    receiveAcceptedInvitationUser(data);
                    break;
                case "eventcreated":
                    receiveEventCreated(data);
                    break;
                case "typing":
                    receiveTyping(data);
                    break;
                case "getmessagesusers":
                    Getmessagesusers(data);
                    break;
                case "getmessagesgroup":
                    Getmessagesgroups(data);
                    break;
                case "Notification":
                    handleNotification(data);
                    break;
            }
        };
    });
 
    return connectionPromise;
}

export function safeSend(data) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
        return true;
    } else {
        console.log("WebSocket not connected, attempting to connect and then send");
        return initializeWebSocket()
            .then(() => {
                socket.send(JSON.stringify(data));
                return true;
            })
            .catch(error => {
                console.error("Failed to send message:", error);
                return false;
            });
    }
}

export function SendOnlineStatus() {
    const data = {
        type: "GETonlineStatus",
    };
    safeSend(data);

}


export function ReceiveOnlineStatus(data) {
    const onlineUsers = data.onlineUsers;

    requestAnimationFrame(() => {
        const allusers = document.querySelectorAll(".user-item");
        allusers.forEach(user => {
            const spanonline = document.querySelectorAll(`#${user.id} .statue`)[0];
            console.log("spanonline" , spanonline);
            
            if (spanonline && onlineUsers.includes(user.id)) {
                spanonline.style.backgroundColor = "#4caf50";
            } else if (spanonline) {
                spanonline.style.backgroundColor = "#d3d3d3";
            }
        });
    });

}






