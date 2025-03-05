import '../../../styles/groupHome.css';
import Link from 'next/link.js';

export default function RootLayout({ children }) { 
  return (
    <div>
        <main className="main-content">
               <div className="group-sidebar">
       <div className="group-header">
            <h2 className="group-title">Tech Geeks</h2>
            <p className="group-members">352 Members</p>
        </div>
        <div className="group-menu">
            <ul className="menu-options">
            <Link href="/group/home" >
                <li className="menu-option active">Group Home</li>
            </Link>
            <Link href="/group/events" >
                <li className="menu-option">Group Events</li>
            </Link>
            <Link href="/group/chat">
                <li className="menu-option">Group Chat</li>
            </Link>
            </ul>
        </div>
        </div>
        {children}
        </main>
    </div>
  );
}