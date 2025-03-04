"use client";
import Image from "next/image";
import "../styles/activitySidebar.css";
// import style from "../profile/profile.module.css";

// import image from "../components/images/pxfuel.jpg";
import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [status, setStatus] = useState("");
  const handuleClick = async () => {
    const res = await fetch(`/api/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        followingId: user.id,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus(data.status);
    }
  };
  console.log(user);
  return (
    <div className="activity-item">
      {/* <Image src={image} className="avatar" alt="Avatar" /> */}
      <div>
        <p>
          <strong>
            {user.lastName} {user.firstName}
          </strong>
        </p>
        <p className="text-muted">@{user.nickname || "N/A"}</p>
      </div>
      {status === "accept" ? (
        <button>unfollow</button>
      ) : status === "pending" ? (
        <button>pending</button>
      ) : (
        <button onClick={() => handuleClick()}>follow</button>
      )}
    </div>
  );
}
