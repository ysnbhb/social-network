'use client';
import {  notFound, usePathname } from 'next/navigation';
import Link from 'next/link.js';
import { useEffect, useState } from 'react';


export default function groupNav({id}) {    
    const pathname = usePathname();
    const [groupInf, setGroupinf] = useState(null);
    const [notfound, setNotfound] = useState(false);
    const GetGroupInfo = async ()=> {
        const res = await fetch(`/api/group/groupInfo?groupId=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            setGroupinf(data);
        }else {
            setNotfound(true);
        }
    }
    useEffect(() => {
        GetGroupInfo();
    }, []);    
    console.log(groupInf);
    
    if (notfound) {
        return notFound()
    }
    return (
        <div className="group-sidebar">
        <div className="group-header">
             <h2 className="group-title">{groupInf?.title}</h2>
             <p className="group-members">{groupInf?.totalMembers} Members</p>
         </div>
         <div className="group-menu">
             <ul className="menu-options">
             <Link href={`/group/${id}`} >
                 <li className={pathname === `/group/${id}` ? "menu-option active" : "menu-option"} >Group Home</li>
             </Link>
             <Link href={`/group/${id}/events`} >
                 <li className={pathname === `/group/${id}/events` ? "menu-option active" : "menu-option"}>Group Events</li>
             </Link>
             <Link href={`/group/${id}/chat`}>
                 <li className={pathname === `/group/${id}/chat` ? "menu-option active" : "menu-option"}>Group Chat</li>
             </Link>
             </ul>
         </div>
         </div>
    )
}