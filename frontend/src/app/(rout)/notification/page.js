"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import sendChangeUnreadNotification from '../../../websocket/notification.js';
import ProfileSide from '../../../components/profileSide.js';
import '../../../styles/notification.css';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    Notifications();
    window.addEventListener('notificationEvent', () => {
      Notifications();
    });
  }, []);

  const Notifications = () => {
    fetch('http://localhost:8080/api/notifications', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleNotificationClick = (notification) => {
    console.log(notification);
     
    sendChangeUnreadNotification(notification.Id);
    
    switch (notification.Type) {
      case "group_request_join":
        router.push('/groups');
        break;
      case "follow":
        router.push(`/profile?username=${notification.Sender}`);
        break;
      case "group_event":
        router.push(`/group/${notification.GroupId}/events`);
      break;
      case "messageGroup":
        router.push(`/group/${notification.GroupId}/chat`);
      default:
        // Default action for other types
        break;
    }
  };

  if (loading) {
    return <h1>Loading Notifications...</h1>;
  }

  if (notifications === null || notifications.length === 0) {
    return <h1>No Notifications</h1>;
  }

  return (
    <main className="main-content">
      <ProfileSide />
      <div className="container">
        <div className="header-notification">
          <div className="header-title">New</div>
          <div className="badge">{notifications.length}</div>
        </div>
        <div className="notification-list">
          {notifications.map((notification) => {
            if (notification.Type !== "messageuser") {
              return (
                <div
                  key={notification.Id}
                  className={`notification ${notification.Readstatus}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                    <div className="avatar"></div>
                    <div className="content">
                      <div>
                        {/* <span className="name">{notification.Sender}</span> */}
                        <span className="action">{notification.Details}</span>
                        {/* <span className="group">Sketch</span> */}
                      </div>
                      {/* <div className="description">Please bring coloured icons to demo...</div> */}
                      <div className="time">{notification.Sent_at}</div>
                      <div className="unread-indicator"></div>
                    </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </main>
  );
}
