"use client";

import { useEffect, useState } from "react";

export default function GroupsInv({ setInvition, invition , setJoinedGroup , setUnjoined }) {
  useEffect(() => {
    async function GetInvition() {
      const res = await fetch(`/api/group/invitations`);
      const data = await res.json();
      console.log(data);
      setInvition(data);
    }
    GetInvition();
  }, []);

  return (
    <div className="groupInvitations">
      <div className="header">
        <h2>Group Invitations</h2>
      </div>
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

