"use client";

import { useEffect } from "react";
import GroupList from "./groupList";

export default function GroupsSide({ groups , setJoinedGroup }) {
  useEffect(() => {
    const getJoinedGroups = async () => {
      const res = await fetch("/api/group/joinlist", {
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
      <div className="groupsList">
        {
          groups.map((group) => (
            <GroupList key={group.id} group={group} />
          ))
        }
      </div>
    </div>
  );
}
