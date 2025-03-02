"use client";
import Image from "next/image";
import "../styles/activitySidebar.css";
// import style from "../profile/profile.module.css";

import image from "../components/images/IMG-20240514-WA0002.jpg";
import { useEffect, useState } from "react";
export default function ActivitySidebar({ className, title }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function GetUser() {
      const res = await fetch(`/api/unfollow`);
      const data = await res.json();      
      setUser(data);
    }
    GetUser()
  } , []);
  
  return (
    <aside className={`activity-sidebar`} style={{marginBottom: '20px' }}>
      <div className="activity-header">
        <h3>unfollow user</h3>
      </div>
      {user.map((item) => (
        <div key={item.id} className="activity-item">
          <Image src={image} className="avatar" alt="Avatar" />
          <div>
            <p>
              <strong>{item.lastName} {item.firstName}</strong>
            </p>
            <p className="text-muted">@{item.nickname || "N/A"}</p>
          </div>
          <button>follow</button>
        </div>
      ))}
    </aside>
  );
}
