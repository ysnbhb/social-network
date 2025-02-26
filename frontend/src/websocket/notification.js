"use client";

import { safeSend } from "./websocket.js";
import { receiveMessageuser } from "./messages.js";

export function handleNotification(data) {
    if (data.Data) {
        const DATA = data.Data
        DATA.forEach(element => {
            const notificationtype = element.Type
            console.log(notificationtype);
            if (element.Readstatus === "unread") {
                if (element.Type === "messageuser") {
                    receiveMessageuser(element);
                } else {
                    console.log(element);
                    
                    ShowNotification(element);
                }
            }

            // if (notificationtype === "follow") {

            // }else if (notificationtype === "eventcreated") {

            // }else if (notificationtype === "acceptedinvitationuser") {

            // }else if (notificationtype === "requestinvitationgroup") {

            // }else if (notificationtype === "messageuser") {

            // }
            console.log(notificationtype);
        });
    }

    console.log("Received notification:", data);

    // console.log("Received notification type:", data.typeOFnotification);
}
function ShowNotification(){
    AddNotificationsymbole(true);

}
export function sendChangeUnreadNotification(Notificationid) {
    const data = {
        type: "changeunreadnotification",
        Notificationid: Notificationid,
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
export function AddMessagesymbole(type) {
    const notification = document.getElementById("notification-badge-message");
    if (type) {
        notification.style.display = "block";
    } else {
        notification.style.display = "none";
    }
}
export function AddNotificationsymbole(type) {
    const notification = document.getElementById("notification-badge");
    if (type) {
        notification.style.display = "block";
    } else {
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

/// notification event ///
export function receiveEventCreated(data) {
    console.log(data);
}

export function sendEventCreated(sender, receiver, eventName, groupid, groupName) {
    const data = {
        type: "eventcreated",
        sender: sender,
        receiver: receiver,
        content: `${sender} created event ${eventName} in group ${groupName}`,
        groupid: groupid
    }
    safeSend(data);
}



