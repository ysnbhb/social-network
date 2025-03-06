"use client"
import { useState, useEffect } from 'react';
import './Notification.css';
import { useRouter } from 'next/navigation'
import sendChangeUnreadNotification from '../../../websocket/notification.js'

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    Notifications();
  }, []);

  const Notifications = () => {
    fetch('http://localhost:8080/api/notifications', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
        console.log(data);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      })
  }
  const handleNotificationClick = (notification) => {
    sendChangeUnreadNotification(notification.Id);
    switch (notification.Type) {
      case "group_request_join":
        router.push('/groups')
        break;
      case "follow":

    }

  }
  if (loading) {
    return <h1>Loading Notifications...</h1>;
  }

  if (notifications === null) {
    return <h1>No Notifications</h1>;
  }

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map((notification) => {
        console.log("notification", notification);

        if (notification.Type !== "messageuser") {
          return (
            <div
              key={notification.Id}
              className={`notification ${notification.Readstatus}`}
              onClick={() => handleNotificationClick(notification)} // Add the click handler here
            >
              <div className="notification-header">
              </div>
              <div className="notification-details">
                <div className="notification-field">
                  <span className="field-label">From {notification.Sender}</span>
                  <span className="field-label">{notification.Sent_at}</span>
                </div>
                <div className="notification-content">
                  <p>{notification.Details}</p>
                </div>
              </div>
            </div>
          );
        }
        return null
      })}
    </div >
  );
}
