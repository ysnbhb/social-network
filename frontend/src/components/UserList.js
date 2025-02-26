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
            <h3>Select a user:</h3>
            <ul>
                {users === null ? (
                    <li>No users available</li>
                ) : (
                    users.map((user) => (

                        <li key={user.id} className="user-item" id={`${user.nickname}`} onClick={() => {
                            handleSelectUser(user)
                            sendGetmessagesusers([user.nickname])
                            sendMessageIsRead(user.nickname)
                        }}>
                            {user.nickname}
                            <span className="notification-badge" id={`notification-badge-${user.nickname}`} style={{ display: user.sendmessage ? 'block' : 'none', }}>*</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default UserList;
