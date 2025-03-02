"use client";

import { safeSend } from "./websocket.js";

export function handleNotification(data) {

    AddMessagesymbole(data.countunreadmessages)

    ShowNotification(data.countNotification);

}
function ShowNotification(count) {

    const notification = document.getElementById("notification-badge");
    const notification2 = document.getElementById("notification-count");
    notification2.innerHTML = count;
    if (count > 0) {
        notification.style.display = "block";
    } else {
        notification2.innerHTML = "";
        notification.style.display = "none";
    }

}
export function sendChangeUnreadNotification(Notificationid) {
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
export function receiveRequestInvitationgroup(data) {
    console.log(data);
}

export function receiveAcceptedInvitationGroup(data) {
    console.log(data);
}
export function sendRequestInvitationGroup(sender, groupid, receiver, groupName) {
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
export function sendFollow(sender, receiver) {
    const data = {
        type: "follow",
        sender: sender,
        receiver: receiver,
        content: `${sender} sent following request to you`
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



