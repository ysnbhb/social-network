'use client';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link.js';

export default function groupNav() {
    const pathname = usePathname();
    return (
        <div className="group-sidebar">
        <div className="group-header">
             <h2 className="group-title">Tech Geeks</h2>
             <p className="group-members">352 Members</p>
         </div>
         <div className="group-menu">
             <ul className="menu-options">
             <Link href="/group/home" >
                 <li className={pathname === "/group/home" ? "menu-option active" : "menu-option"} >Group Home</li>
             </Link>
             <Link href="/group/events" >
                 <li className={pathname === "/group/events" ? "menu-option active" : "menu-option"}>Group Events</li>
             </Link>
             <Link href="/group/chat">
                 <li className={pathname === "/group/chat" ? "menu-option active" : "menu-option"}>Group Chat</li>
             </Link>
             </ul>
         </div>
         </div>
    )
}