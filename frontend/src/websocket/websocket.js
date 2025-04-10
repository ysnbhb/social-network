"use client";
import { handleNotification, sendNotification } from "./notification.js";
import { redirect, useRouter } from "next/navigation";
import {
  Getmessagesusers,
  receiveMessageuser,
  receiveMessageGroup,
  Getmessagesgroups,
} from "./messages.js";
import { API_URL_WS } from "@/components/api.js";

export let socket;
let connectionPromise = null;

function getCookie(name) {
  if (typeof document === 'undefined') {
    return null;
  }
  let cookieArray = document.cookie.split(";")
  
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.startsWith(name + "=")) {
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
    // if (!sessionId) {
    //   console.log("Session ID not found in cookies.");
    //   router.push('/login');
    //   return;
    // }
    socket = new WebSocket(`${API_URL_WS}/ws?session_id=${sessionId}`);



    socket.onopen = function () {
      console.log("WebSocket connection established.");
      resolve(socket);
    };

    socket.onerror = function (error) {
      console.log("Error event:", error);
      reject(error);
    };

    socket.onclose = function (event) {
      console.log("WebSocket connection closed with code:", event.code);
      connectionPromise = null;
      reject(
        new Error(
          `WebSocket connection closed unexpectedly with code: ${event.code}`
        )
      );
    };

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      const type = data.type;

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
        case "getmessagesusers":
          Getmessagesusers(data);
          break;
        case "getmessagesgroups":
          Getmessagesgroups(data);
          break;
        case "Notification":
          handleNotification(data);
          break;
        case "realNotification":
          sendNotification();
          break;
        case "error":
            showError(data.content)
            break;
      }
    };
  });

  return connectionPromise;
}

export function safeSend(data) {
 
  const sessionId = getCookie("session_id");
  
  if ((sessionId === null|| sessionId == "") && data.type !== "closeconnection" ) {
    console.log("Session ID not found in cookies.");
    Closeconnection();
    redirect('/login');
    return;
    // router.push('/login');
    // return;
  }

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
      .catch((error) => {
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

export function Closeconnection() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
  const data = {
    type: "closeconnection",
  };
  safeSend(data);
}

export function ReceiveOnlineStatus(data) {
  const onlineUsers = data.onlineUsers;
  const allusers = document.querySelectorAll(".user-item");
  allusers.forEach((user) => {
    const spanonline = user.querySelector(".statue");
    if (spanonline && onlineUsers.includes(user.id)) {
      spanonline.style.backgroundColor = "green";
    } else if (spanonline) {
      spanonline.style.backgroundColor = "#d3d3d3";
    }
  });
}




function setupMessageClose(messageElement, duration = 3000) {
  const closeTimeout = setTimeout(() => {
      messageElement.remove()
      clearTimeout(closeTimeout)
  }, duration)
}

export function showError(message) {
  const errorMessage = document.createElement('dv')
  errorMessage.id = 'errorMessage'
  errorMessage.textContent = message;
  document.body.appendChild(errorMessage)
  setupMessageClose(errorMessage);
}