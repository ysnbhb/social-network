"use client";
import "../styles/activitySidebar.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import handleFollowers from "@/lib/handleFollowors";
import useHandleFollowers from "@/lib/handleFollowors";
 export default function ActivitySidebar({ className, title }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function GetUser() {
      const res = await fetch(`/api/unfollow`);
      const data = await res.json();
      console.log(data);

      setUser(data);
    }
    GetUser();
  }, []);
  console.log(user);

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
  console.log(status);
  
    return (
    <div className="activity-item">
      <div>
        <p>
          <strong>
             <Link className="link" href={{ pathname: '/profile', query: { username: user.nickname } }}>
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
