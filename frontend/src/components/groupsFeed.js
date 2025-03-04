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
        <div className="content-area">
        <div className="group-creator">
          <div className="creator-header">
            <div className="creator-title">Create a New Group</div>
            <button className="create-btn">+ Create Group</button>
          </div>
        </div>

      <div className="groups-feed">
        <div className="feed-group-item">
          <div className="feed-group-header">
            <div className="feed-group-title">JavaScript Enthusiasts</div>
            <div className="feed-group-date">Created: March 1, 2025</div>
          </div>
          <div className="feed-group-description">
            A community dedicated to JavaScript developers of all levels. Share your projects, discuss new frameworks, and help each other solve coding challenges.
          </div>
          <div className="feed-group-footer">
            <div className="feed-group-meta">87 members • 23 posts</div>
            <button className="join-group-btn">Join Group</button>
          </div>
        </div>

        <div className="feed-group-item">
          <div className="feed-group-header">
            <div className="feed-group-title">AI & Machine Learning</div>
            <div className="feed-group-date">Created: February 25, 2025</div>
          </div>
          <div className="feed-group-description">
            Explore the fascinating world of artificial intelligence and machine learning. From beginner tutorials to advanced research discussions, this group covers it all.
          </div>
          <div className="feed-group-footer">
            <div className="feed-group-meta">156 members • 47 posts</div>
            <button className="join-group-btn">Join Group</button>
          </div>
        </div>

        <div className="feed-group-item">
          <div className="feed-group-header">
            <div className="feed-group-title">UI/UX Design Trends</div>
            <div className="feed-group-date">Created: February 20, 2025</div>
          </div>
          <div className="feed-group-description">
            Stay up-to-date with the latest trends in user interface and experience design. Share your portfolio, get feedback, and discuss innovative design concepts.
          </div>
          <div className="feed-group-footer">
            <div className="feed-group-meta">92 members • 18 posts</div>
            <button className="join-group-btn">Join Group</button>
          </div>
        </div>

        <div className="feed-group-item">
          <div className="feed-group-header">
            <div className="feed-group-title">Cloud Computing</div>
            <div className="feed-group-date">Created: February 15, 2025</div>
          </div>
          <div className="feed-group-description">
            Discuss cloud platforms, services, and best practices. From AWS to Azure to Google Cloud, explore the technologies that power modern applications.
          </div>
          <div className="feed-group-footer">
            <div className="feed-group-meta">118 members • 31 posts</div>
            <button className="join-group-btn">Join Group</button>
          </div>
        </div>
      </div>
    </div>
    );
}