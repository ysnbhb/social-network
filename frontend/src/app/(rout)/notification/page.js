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
        console.log("data", data);

        setNotifications(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleNotificationClick = (notification) => {

    sendChangeUnreadNotification(notification.Id);

    switch (notification.Type) {
      case "group_request_join":
      case "joingroup(accept/reject)":
        router.push('/groups');
        break;
      case "follow":
      case "reject":
        router.push(`/profile/${notification.Sender}`);
        break;
      case "group_event":
        router.push(`/group/${notification.GroupId}/events`);
        break;
      case "messageGroup":
        router.push(`/group/${notification.GroupId}/chat`);
      default:
        
        break;
    }
  };

  const Acceptfollow = (notification, action) => {
    fetch(`http://localhost:8080/api/acceptfollow`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        follower: notification.Sender,
        action: action,
      })
    })
      .then((response) => {
        response.json()
        if (response.status === 200) {
          Notifications();
          sendChangeUnreadNotification(notification.Id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function AcceptJoinGroup(notification, action) {
    fetch(`http://localhost:8080/api/group/acceptjoin`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        groupId: notification.GroupId,
        sender: notification.Sender,
        status: action,
      })
    })
      .then((response) => {
        response.json()
        if (response.status === 200) {
          Notifications();
          sendChangeUnreadNotification(notification.Id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (loading) {
    return <h1>Loading Notifications...</h1>;
  }

  console.log("notifications", notifications);


  return (
    <main className="main-content">
      <ProfileSide />
      <div className="container">
        <div className="header-notification">
          <div className="header-title">All notification</div>
          <div className="badge">{notifications?.length || 0}</div>
        </div>
        <div className="notification-list">
          {notifications === null && (
            <div className="no-notification">
              <p>No notifications</p>
            </div>
          )}
          {notifications?.map((notification) => {
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
                      <span className="action">{notification.Details}</span>
                    </div>
                    <div className="time">{notification.Sent_at}</div>
                    <div className="unread-indicator"></div>
                  </div>
                  {notification.Status === 'pending' && (
                    <div className="buttons">
                      <button className="accept-button" onClick={(event) => {
                        Acceptfollow(notification, "Accept")
                        event.stopPropagation();
                      }}>Accept</button>
                      <button className="Refuse-button" onClick={(event) => {
                        Acceptfollow(notification, "Reject")
                        event.stopPropagation();
                      }}>Reject</button>
                    </div>
                  )}
                  {notification.Type === "group_request_join" && (
                    <div className="buttons">
                      <button className="accept-button" onClick={(event) => {
                        AcceptJoinGroup(notification, "Accept")
                        event.stopPropagation();
                      }}>Accept</button>
                      <button className="Refuse-button" onClick={(event) => {
                        AcceptJoinGroup(notification, "Reject")
                        event.stopPropagation();
                      }}>Reject</button>
                    </div>
                  )}
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
