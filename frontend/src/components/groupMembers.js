"use client";
import Link from 'next/link.js';
import { useEffect, useState } from 'react';
export default function GroupMembers({ id }) {
    const [members, Getmembers] = useState(null);
    useEffect(() => {
        if (id) {
            fetch(`/api/group/members?groupid=${id}`, {
                method: 'GET',
                credentials: 'include'
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log("error");

                        // router.replace('/pageNotfoud');
                    }
                    return response.json()
                })
                .then((userData) => {
                    Getmembers(userData);
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
                <ul className="menu-options">
                    <Link href={`/group/`} >

                    </Link>
                </ul>
            </div>
        </div>
    )
}