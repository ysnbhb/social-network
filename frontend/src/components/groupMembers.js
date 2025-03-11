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
                    <div className="no-data" >
                      <h1>There are no members</h1>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                      </svg>
                    </div>
                  )}

                
            </div>
        </div>
    );
}
