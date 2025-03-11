"use client";

import { useEffect, useState } from "react";
import { API_URL } from "./api";

export default function GroupsInv({ setInvition, invition , setJoinedGroup , setUnjoined }) {
  useEffect(() => {
    async function GetInvition() {
      const res = await fetch(`${API_URL}/api/group/invitations` , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setInvition(data);
    }
    GetInvition();
  }, []);
  console.log("invition",invition);
  

  return (
    <div className="groupInvitations">
      <div className="header">
        <h2>Group Invitations</h2>
      </div>

      {invition.length === 0 && (
    <div className="no-data" >
      <h1>There are no invitations</h1>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    </div>
  )}


      <div className="invitationsList">
        {invition.map((item) => (
          <Groupinv key={item.id} group={item} setJoinedGroup = {setJoinedGroup} setUnjoined={setUnjoined}/>
        ))}
      </div>
    </div>
  );
}

export function Groupinv({ group, setJoinedGroup   , setUnjoined}) {
  const { id, title, status, description, totalMembers, isMember } = group;
  const [statusingroup, setStatus] = useState(status);
  const [ismember, setIsmember] = useState(isMember);
  const [totalmembers, setTotalmembers] = useState(totalMembers);

  async function JoinToGroup(acceptJoin = 1) {
    const res = await fetch(`${API_URL}/api/group/join?groupId=${id}`, {
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
    setIsmember(data.isMember);
    setTotalmembers(data.totalMembers);

    if (data.isMember) {
      setJoinedGroup((prev) => [
        ...prev,
        {
          id,
          title,
          status: data.status,
          description,
          totalMembers: data.totalMembers,
          isMember: true,
        },
      ]);
    }else if (data.status === "") {
      setUnjoined((prev) =>[
        ...prev,
        {
          id,
          title,
          status: data.status,
          description,
          totalMembers: data.totalMembers,
          isMember: false,
        },
      ] );
  }}
  if
   (ismember || statusingroup =="") return null;

  return (
    <div className="invitation-item">
      <div className="invitation-info">
        <div className="invitation-title">{title}</div>
        <div className="invitation-members">{totalMembers} members</div>
      </div>
      <div className="invitation-actions">
        <button className="accept-btn" onClick={() => JoinToGroup(1)}>
          Accept
        </button>
        <button className="cancel-btn" onClick={() => JoinToGroup(-1)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

