"use client"
import { useState, useEffect } from 'react';
import ProfileSide from '../../../components/profileSide.js';
import '../../../styles/notification.css';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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
  if (loading) {
    return <h1>Loading Notifications...</h1>;
  }

  if (notifications === null) {
    return <h1>No Notifications</h1>;
  }

  return (
    <main className="main-content">
   <ProfileSide  />
    <div>
    <div className="container">
    
            <div className="header-notification">
                <div className="header-title">New</div>
                <div className="badge">2</div>
            </div>
            <div className="notification-list">
      {notifications.map((notification) => {
        console.log(notification);
        
        if (notification.Type !== "messageuser") {
          return (
            <div key={notification.Id} className={`notification ${notification.Readstatus}`}>
              <div className="avatar">
              </div>
              <div className="content">
                    <div>
                        <span className="name">{notification.Sender}</span>
                        <span className="action">posted in</span>
                        <span className="group">Sketch</span>
                    </div>
                    {/* <div className="description">Please bring coloured icons to demo...</div> */}
                    <div className="time">{notification.Sent_at}</div>
                    <div className="unread-indicator"></div>
                </div>
        </div>
          );
        }
        return null
      })}
      </div>
      </div>
      </div>
    </main>
  );
}
