// "use client"

import { useEffect, useState } from "react";
import "../styles/groupsFeed.css";
// import GroupList from "./groupList";

export default function GroupsFeed({ unjoined, setUnjoined }) {
  // const [groups, setGroups] = useState([]);
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch("/api/group/unjoinedgroups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUnjoined(data);
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
        {unjoined.map((group) => (
          <Unjoined key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

function Unjoined({ group }) {
  const { id, title, description, status, totalMembers } = group;
  const [statusingroup, setStatus] = useState(status);
  console.log();
  async function JoinToGroup(acceptJoin = 1) {
    const res = await fetch(`/api/group/join?groupId=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id,
        acceptJoin,
      }),
      credentials: "include",
    });
    const data = await res.json();
    setStatus(data.status);
    console.log(data.isMember, data.status, data.totalMembers);
  }
  return (
    <div className="feed-group-item">
      <div className="feed-group-header">
        <div className="feed-group-title">{title}</div>
        {/* <div className="feed-group-date">Created: March 1, 2025</div> */}
      </div>
      <div className="feed-group-description">{description}</div>
      <div className="feed-group-footer">
        <div className="feed-group-meta">{totalMembers} members</div>
        {statusingroup === "pending" ? (
          <button className="join-group-btn" style={{
            backgroundColor: "#ffc107",
          }}
          onClick={() => {
            JoinToGroup(0);
          }}
          >wait admin</button>
        ) : (
          <button
            className="join-group-btn"
            onClick={() => {
              JoinToGroup();
            }}
          >
            Join Group
          </button>
        )}
      </div>
    </div>
  );
}
