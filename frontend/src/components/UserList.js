import { useEffect, useState } from 'react';
import { sendGetmessagesusers, sendMessageIsRead } from '../websocket/messages.js';
import { SendOnlineStatus } from '../websocket/websocket.js';
import '../styles/chat.css';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { API_URL } from './api.js';

function UserList() {
    console.log("UserList component rendered");

    const pathname = usePathname();
    const [users, setUsers] = useState([]); // State to hold the list of users
    const Router = useRouter();

    useEffect(() => {
        Getfriends();

        const handleUpdateUserList = () => {
            Getfriends();
        };

        window.addEventListener('updateUserList', handleUpdateUserList);

    }, []);

    const Getfriends = () => {
        fetch(`${API_URL}/api/friends`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                SendOnlineStatus();
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });


    };

    // Handle selecting a user from the list
    const handleSelectUser = (user) => {
        if (pathname !== `/chat/${user.nickname}`) {
            sendGetmessagesusers([user.nickname], 0);
            sendMessageIsRead(user.nickname);
            Router.push(`/chat/${user.nickname}`);
        } else {
            Router.push(`/chat`);
        }

    };
    if (users === "Unauthorized") {
        return null
    }

    return (
        <div className="user-list">
            <h3>Users:</h3>
            <div className="user-list-container">
                {console.log("test", users)}
                {users === null ? (
                    <div className="no-users-message">No users available</div>
                ) : (
                    users.map((user) => (

                        <div
                            key={user.id}
                            className="user-item"
                            id={`${user.nickname}`}
                            onClick={(
                            ) => handleSelectUser(user)}  // Handle user selection
                        >
                            <div className="avatar">
                                <img src={`${API_URL}${user.avatar}`} alt="Post" />
                            </div>
                            <div className={`statue`}></div>
                            <div className="user-info">
                                <span className="user-nickname">{user.nickname}</span>
                                <span
                                    className="notification-badge"
                                    id={`notification-badge-${user.nickname}`}
                                    style={{
                                        display: user.sendmessage ? 'inline-block' : 'none',
                                    }}
                                >
                                    📩
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
