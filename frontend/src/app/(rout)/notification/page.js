"use client"
import React, { useState } from 'react';
import './Notification.css';

const fakeNotification = [
  {
    id: 1,
    sender: "John Smith",
    receiver: "Alex Johnson",
    content: "Hello Alex, your project proposal has been approved. Please schedule a kickoff meeting with the team at your earliest convenience.",
    time: "2025-02-26T14:32:45Z"
  },
  {
    id: 2,
    sender: "Jane Doe",
    receiver: "Bob Johnson",
    content: "Hi Bob, I'm sorry to hear about your project delay. Please let me know if there's anything I can do to help.",
    time: "2025-02-26T14:32:45Z"
  }
];

export default function Notification() {
  const [notification] = useState(fakeNotification);

  <h1>Notification</h1>
  return (
    notification.map((notification) => (
      <div key={notification.id} className="notification">
        <div className="notification-header">
        </div>
        <div className="notification-details">
          <div className="notification-field">
            <span className="field-label">From:</span>
            <span className="field-value">{notification.sender}</span>
          </div>
          <div className="notification-field">
            <span className="field-label">To:</span>
            <span className="field-value">{notification.receiver}</span>
          </div>
          <div className="notification-content">
            <p>{notification.content}</p>
          </div>
          <div className="notification-time">
            <span className="time-label">Time:</span>
            <span className="time-value">{notification.time}</span>
          </div>
        </div>
      </div>
    ))
  );
}
