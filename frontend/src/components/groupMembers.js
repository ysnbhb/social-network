"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from './api';

export default function GroupMembers({ id }) {
    const [members, setMembers] = useState(null);
    const Router = useRouter();
    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/api/group/members?groupid=${id}`, {
                method: 'GET',
                credentials: 'include'
            })
                .then((response) => {
                    if (!response.ok) {
                        return;
                    }
                    return response.json();
                })
                .then((userData) => {
                    setMembers(userData);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [id]);

    return (
        <div className="group-sidebar">
            <div className="group-header">
                <h2 className="group-title">Members</h2>
            </div>
            <div className="group-menu">
                {members ? (
                    <ul className="menu-options">
                        {members.map((member) => (
                            <li key={member.id} className="menu-option">
                                <p onClick={() => { Router.push(`/profile/${member.nickname}`) }}>
                                    {member.nickname}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading members...</p>
                )}
            </div>
        </div>
    );
}
