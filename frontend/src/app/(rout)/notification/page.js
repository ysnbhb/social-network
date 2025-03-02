"use client"
import { useState, useEffect } from 'react';
import './Notification.css';

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
    <div>
      <h1>Notifications</h1>
      {notifications.map((notification) => {
        if (notification.Type !== "messageuser") {
          return (
            <div key={notification.Id} className={`notification ${notification.Readstatus}`}>
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
