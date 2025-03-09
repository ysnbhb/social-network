"use client";

import { safeSend } from "./websocket.js";

export function handleNotification(data) {
    AddMessagesymbole(data.countunreadmessages)
    ShowNotification(data.countNotification);
    if (window.location.pathname === "/notification") {
        const notificationEvente = new CustomEvent("notificationEvent")
        window.dispatchEvent(notificationEvente)
    }
}

function ShowNotification(count) {

    const notification = document.getElementById("notification-badge");
    const notification2 = document.getElementById("notification-count");
    if (!notification || !notification2) return;
    notification2.innerHTML = count;
    if (count > 0) {
        notification.style.display = "block";
    } else {
        notification2.innerHTML = "";
        notification.style.display = "none";
    }

}
export default function sendChangeUnreadNotification(Notificationid) {
    const data = {
        type: "changeunreadnotification",
        Notificationid: Notificationid,
    }
    safeSend(data);
}
export function sendNotification() {
    const data = {
        type: "GetNotification",
    }
    safeSend(data);
}
/// notification group ///

export function sendRequestInvitationGroup(sender, gro) {
    const data = {
        type: "requestinvitationgroup",
        sender: sender,
        groupid: groupid,
        receiver: receiver,
        content: `${sender} sent invitation to join group ${groupName}`
    }
    safeSend(data);
}
export function sendAcceptedInvitationGroup(sender, groupid, receiver, groupName) {
    const data = {
        type: "acceptedinvitationgroup",
        sender: sender,
        groupid: groupid,
        receiver: receiver,
        content: `${sender} accepted invitation to join group ${groupName}`
    }
    safeSend(data);
}

/// notification user ///
export function AddMessagesymbole(count) {
    const notification = document.getElementById("notification-badge-message");
    const notification2 = document.getElementById("notification-count-message");
    if (!notification || !notification2) return;
    if (count > 0) {
        notification2.innerHTML = count;
        notification.style.display = "block";
    } else {
        notification2.innerHTML = "";
        notification.style.display = "none";
    }
}


/// notification follow ///
export function receiveFollow(data) {
    console.log(data);
}
export function sendFollow(receiver) {
    const data = {
        type: "follow",
        receiver: [receiver],
    }
    safeSend(data);
}
export function sendAcceptedInvitationUser(sender, receiver) {
    const data = {
        type: "acceptedinvitationuser",
        sender: sender,
        receiver: receiver,
        content: `${sender} accepted following request`
    }
    safeSend(data);
}
export function receiveAcceptedInvitationUser(data) {
    console.log(data)
}



