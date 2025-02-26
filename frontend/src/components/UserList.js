import { useEffect, useState } from 'react';
import { sendGetmessagesusers, sendMessageIsRead} from '../websocket/messages.js';
import '../styles/chat.css';

function UserList({ setSelectedUser }) {
    const [users, setUsers] = useState([]); // State to hold the list of users

    useEffect(() => {
        Getfriends();

        // initializeWebSocket()
        // .then(() => {
        //     SendOnlineStatus();
        // })
        // .catch(error => {
        //     console.error("Failed to initialize websocket in UserList:", error);
        // });
    }, []);

    const Getfriends = () => {
        fetch('http://localhost:8080/api/friends', {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });


    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };
    return (
        <div className="user-list">
        <h3>Users:</h3>
        <div className="user-list-container">
            {users === null ? (
                <div className="no-users-message">No users available</div>
            ) : (
                users.map((user) => (
                    <div
                        key={user.id}
                        className="user-item"
                        id={`${user.nickname}`}
                        onClick={() => {
                            handleSelectUser(user);
                            sendGetmessagesusers([user.nickname]);
                            sendMessageIsRead(user.nickname);
                        }}
                    >
                        <div className="avatar"></div>
                        <div className={`statue ${user.online ? 'online' : ''}`}></div>
                        <div className="user-info">
                            <span className="user-nickname">{user.nickname}</span>
                            <span
                                className="notification-badge"
                                id={`notification-badge-${user.nickname}`}
                                style={{
                                    display: user.sendmessage ? 'inline-block' : 'none',
                                    backgroundColor: user.sendmessage ? '#ff3d00' : 'transparent', // Red for notification
                                }}
                            >
                                *
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
    );
}

export default UserList;
