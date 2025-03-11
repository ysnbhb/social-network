"use client";

import { useEffect } from "react";
import GroupList from "./groupList";
import { API_URL } from "./api";

export default function GroupsSide({ groups , setJoinedGroup }) {
  useEffect(() => {
    const getJoinedGroups = async () => {
      const res = await fetch(`${API_URL}/api/group/joinlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setJoinedGroup(data);
    };
    getJoinedGroups()
  } , []);
  return (
    <div className="myGroupsSide">
      <div className="header">
        <h2>My Groups</h2>
      </div>

      {groups.length === 0 && (
    <div className="no-data" >
      <h1>There are no Groups</h1>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    </div>
  )}

      <div className="groupsList">
        {groups.map((group) => (
            <GroupList key={group.id} group={group} />
          ))}
      </div>
    </div>
  );
}
