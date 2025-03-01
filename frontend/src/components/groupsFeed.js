"use client"

import { useEffect, useState } from 'react';
import '../styles/groupsFeed.css';
import GroupList from './groupList';



export default function GroupsFeed() {
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch('/api/group/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            setGroups(data);
        };
        fetchGroups();
    }, []);
    return (
        <main className="groups">
        {groups.map((group) => (
            <GroupList key={group.id} group={group} />
        ))}
    {/* <GroupList/>
        <aside className="group-sidebar">
            <div className="group-header">
                <h2>Playing Minecraft</h2>
                <div className="group_avatar"></div>
            </div>
            <div className="description-group">
                <p className="text-muted">This is about all players in Minecraft.</p>
            </div>
            <div className="group-stats">
                <button className="open-button">OPEN</button>
                <div>
                    <h3>10</h3>
                    <p className="text-muted">Members</p>
                </div>
            </div>
        </aside>
        
        <aside className="group-sidebar">
            <div className="group-header">
                <h2>Playing Minecraft</h2>
                <div className="group_avatar"></div>
            </div>
            <div className="description-group">
                <p className="text-muted">This is about all players in Minecraft.</p>
            </div>
            <div className="group-stats">
                <button className="join-button">JOIN</button>
                <div>
                    <h3>10</h3>
                    <p className="text-muted">Members</p>
                </div>
            </div>
        </aside>
        <aside className="group-sidebar">
            <div className="group-header">
                <h2>Playing Minecraft</h2>
                <div className="group_avatar"></div>
            </div>
            <div className="description-group">
                <p className="text-muted">This is about all players in Minecraft.</p>
            </div>
            <div className="group-stats">
                <button className="join-button">JOIN</button>
                <div>
                    <h3>10</h3>
                    <p className="text-muted">Members</p>
                </div>
            </div>
        </aside>
        <aside className="group-sidebar">
            <div className="group-header">
                <h2>Playing Minecraft</h2>
                <div className="group_avatar"></div>
            </div>
            <div className="description-group">
                <p className="text-muted">This is about all players in Minecraft.</p>
            </div>
            <div className="group-stats">
                <button className="join-button">JOIN</button>
                <div>
                    <h3>10</h3>
                    <p className="text-muted">Members</p>
                </div>
            </div>
        </aside> */}
    </main>
    );
}