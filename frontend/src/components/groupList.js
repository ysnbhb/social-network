import { useState } from 'react';
import '../styles/groupsFeed.css';

import Link from 'next/link';


export default function GroupList({group}) {
    const {id , title  , description  ,isMember ,  status , totalMembers} = group
    const [ismember , setIsmember] = useState(isMember)
    const [statusingroup , setStatus] = useState(status)
    const [totalmembers , setTotalMembers] = useState(totalMembers)
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
       const  data = await res.json();
        setIsmember(data.isMember)
        setStatus(data.status)
       setTotalMembers(data.totalMembers)
        
       console.log(data.isMember , data.status , data.totalMembers);
       
    }
    return <>
    <aside className="group-sidebar">
            <div className="group-header">
                <h2>{title}</h2>
                <div className="group_avatar"></div>
            </div>
            <p className="text-muted">{description}.</p>
            <div className="group-stats">
                <div>
                    <h3>{totalmembers}</h3>
                    <p className="text-muted">Members</p>
                </div>
                {ismember ? <Link href={`/groups/${id}`} style={{
                    textDecoration : "none",
                }} className="open-button">OPEN</Link> :
                statusingroup === "pending" ? <button className="pending-button" onClick={()=>JoinToGroup(1)}>PENDING</button> :
                statusingroup === "invitation" ?<div className='invitation'> <button className="invitation-button" 
                onClick={()=>JoinToGroup(1)}
                >accept</button>
                 <button className="invitation-button reject"
                onClick={()=>JoinToGroup(-1)}
                >reject</button> </div> :
                <button className="join-button" onClick={()=>JoinToGroup()} >JOIN</button>}
            </div>
        </aside>
    </>
}