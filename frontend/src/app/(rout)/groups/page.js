"use client";
import { useState } from "react";
import GroupsFeed from "../../../components/groupsFeed.js";
import GroupsInv from "../../../components/groupsInv.js";
import GroupsSide from "../../../components/groupsSide.js";
import '../../../styles/groups.css';

export default function Groups() {
  const [joinedGroup, setJoinedGroup] = useState([]);
  const [invition, setInvition] = useState([]);
  const [unjoined, setUnjoined] = useState([]);
  return (
    <div>
       <main className="main-content">
       <GroupsSide  setJoinedGroup={setJoinedGroup} groups={joinedGroup} />
       <GroupsFeed unjoined={unjoined} setUnjoined={setUnjoined} setJoinedGroup={setJoinedGroup} />
       <GroupsInv  setInvition={setInvition} invition={invition} setJoinedGroup = {setJoinedGroup} setUnjoined={setUnjoined} />
       </main>
    </div>
  );
}