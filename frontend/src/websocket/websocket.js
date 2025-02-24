
let socket
function connectwebsocket() {
    socket = new WebSocket('ws://localhost:8080/ws');
    socket.onopen = function () {
        console.log('WebSocket connection established.');
    };
    // receive message from websocket
    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        const type = data.type;
        switch (type) {
            case "onlineStatus":
                receiveOnlineStatus(data)
                break;
            case "messageuser":
                receiveMessageuser(data)
                break;
            case "messageGroup":
                receiveMessageGroup(data)
                break;
            case "follow":
                receiveFollow(data)
                break;
            case "requestinvitationgroup":
                receiveRequestInvitationgroup(data)
                break;
            case "acceptedinvitationgroup":
                receiveAcceptedInvitationGroup(data)
                break;
            case "acceptedinvitationuser":
                receiveAcceptedInvitationUser(data)
                break;
            case "eventcreated":
                receiveEventCreated(data)
                break;
            case "typing":
                receiveTyping(data)
                break;
            case "getmessagesusers":
                Getmessagesusers(data)
                break;
            case "getmessagesgroup":
                Getmessagesgroups(data)
                break;
        }
    };

    socket.onerror = function (error) {
        console.error('WebSocket error:', error);
    };

    socket.onclose = function () {
        console.log('WebSocket connection closed.');
    };
}


function sendMessageuser(sender, receiver, message) {
    const data = {
        type: "messageuser",
        sender: sender,
        receiver: receiver,
        content: message
    }
    socket.send(JSON.stringify(data));
}

function sendMessageGroup(sender, groupid, message) {
    const data = {
        type: "messageGroup",
        sender: sender,
        groupid: groupid,
        content: message
    }
    socket.send(JSON.stringify(data));
}

function sendFollow(sender, receiver) {
    const data = {
        type: "follow",
        sender: sender,
        receiver: receiver,
        content: `${sender} sent following request to you`
    }
    socket.send(JSON.stringify(data));
}
function sendRequestInvitationGroup(sender, groupid, receiver, groupName) {
    const data = {
        type: "requestinvitationgroup",
        sender: sender,
        groupid: groupid,
        receiver: receiver,
        content: `${sender} sent invitation to join group ${groupName}`
    }
    socket.send(JSON.stringify(data));
}
function sendAcceptedInvitationGroup(sender, groupid, receiver, groupName) {
    const data = {
        type: "acceptedinvitationgroup",
        sender: sender,
        groupid: groupid,
        receiver: receiver,
        content: `${sender} accepted invitation to join group ${groupName}`
    }
    socket.send(JSON.stringify(data));
}
function sendAcceptedInvitationUser(sender, receiver) {
    const data = {
        type: "acceptedinvitationuser",
        sender: sender,
        receiver: receiver,
        content: `${sender} accepted following request`
    }
    socket.send(JSON.stringify(data));
}
function sendEventCreated(sender, receiver, eventName, groupid, groupName) {
    const data = {
        type: "eventcreated",
        sender: sender,
        receiver: receiver,
        content: `${sender} created event ${eventName} in group ${groupName}`,
        groupid: groupid
    }
    socket.send(JSON.stringify(data))
}
function sendTyping(sender, receiver) {
    const data = {
        type: "typing",
        sender: sender,
        receiver: receiver,
        content: `${sender} is typing`
    }
    socket.send(JSON.stringify(data))
}
function sendGetmessagesusers(sender, receiver) {
    const data = {
        type: "getmessagesusers",
        sender: sender,
        receiver: receiver,
    }
    socket.send(JSON.stringify(data))
}
function sendGetmessagesgroups(sender, groupid) {
    const data = {
        type: "getmessagesgroup",
        sender: sender,
        groupid: groupid,
    }
    socket.send(JSON.stringify(data))
}
function sendChangeUnreadNotification(Notificationid) {
    const data = {
        type: "changeunreadnotification",
        Notificationid: Notificationid,
    }
    socket.send(JSON.stringify(data))
}
