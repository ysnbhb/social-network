"use client";
import "../styles/activitySidebar.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import useHandleFollowers from "@/app/hooks/usehandleFollower";
  
 export default function ActivitySidebar({ className, title }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function GetUser() {
      const res = await fetch(`/api/unfollow`);
      const data = await res.json();
      setUser(data);
    }
    GetUser();
  }, []);

  return (
    <aside className={`activity-sidebar`} style={{ marginBottom: "20px" }}>
      <div className="activity-header">
        <h3>unfollow user</h3>
        <Link
          href="/unfollow"
          style={{
            marginLeft: "auto",
            marginRight: "10px",
            color: "blue",
            border: "none",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          {" "}
          See All
        </Link>
      </div>
      {user.map((item) => (
        <ShowUnfllowUser key={item.id} user={item} />
      ))}
    </aside>
  );
}

export function ShowUnfllowUser({ user }) {
    const { status, handle } = useHandleFollowers(user.id);

   const handuleClick = async () => {
    await handle();  
  };  
    return (
    <div className="activity-item">
      <div>
        <p>
          <strong>
             <Link className="link" href={{ pathname:`/profile/${user.nickname}`}}>
              {user.lastName} {user.firstName}
            </Link>
          </strong>
        </p>
        <p className="text-muted">@{user.nickname || "N/A"}</p>
      </div>
      {status === "accept" ? (
        <button>unfollow</button>
      ) : status === "pending" ? (
        <button>pending</button>
      ) : (
        <button onClick={() => handuleClick(user.id)}>follow</button>
      )}
    </div>
  );
}
