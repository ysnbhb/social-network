import { useEffect, useState } from 'react';
import '../styles/chat.css';

function UserList({ setSelectedUser }) {
    const [users, setUsers] = useState([]); // State to hold the list of users

    useEffect(() => {
        Getfriends();
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
                {users === null ? (<li>No users available</li>) :
                    (users.map((user) => (
                        <li key={user.id} onClick={() => handleSelectUser(user)} className="user-item">
                            {user.nickname}
                        </li>
                    ))
                    )}
            </ul>
        </div>
    );
}

export default UserList;
