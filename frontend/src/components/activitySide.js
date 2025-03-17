"use client";
import "../styles/activitySidebar.css";
import { useEffect, useState } from "react";
 import useHandleFollowers from "@/app/hooks/usehandleFollower";
import { API_URL } from "./api";
export let UsersSelected = []
import Follow from "./Follow";
  
 export default function ActivitySidebar( ) {
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    async function GetUser() {
      const res = await fetch(`${API_URL}/api/unfollow` , {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      data != null ? setUser(data) : setUser([])
    }
    GetUser();
  }, []);
  function serchfunc() {
    
    const search = document.getElementById("search").value;
    console.log("search", search);
    
    if (search.length === 0) {
      return;
    }
    fetch(`${API_URL}/api/search/users?searchContent=${search}`, {
      method: "GET",
      credentials: "include",
    })
    .then((response) => response.json())
    .then((data) => data != null ? setUser(data) : setUser([]))
    .catch((error) => console.error(error));
  }
  console.log(user);
  

  return (
    <aside className={`activity-sidebar`} style={{ marginBottom: "20px" }}>
      <div className="activity-header">
        <input type="text" placeholder="Search.." id="search"></input>
        <button
          onClick={() => {
            serchfunc();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 72 72"
          >
            <path d="M28.131 10.632c-6.262 0-12.141 3.348-15.342 8.738a1 1 0 1 0 1.72 1.022c2.843-4.786 8.062-7.76 13.622-7.76a1 1 0 1 0 0-2zM11.967 23.646a1.001 1.001 0 0 0-1.201.746c-.299 1.276-.468 2.067-.468 3.487a1 1 0 1 0 2 0c0-1.205.135-1.834.415-3.032a1 1 0 0 0-.746-1.201z"></path>
            <path d="M66.613 57.793L50.471 41.652a4.963 4.963 0 0 0-1.17-.877 24.346 24.346 0 0 0 3.33-12.311c0-13.51-10.99-24.5-24.5-24.5-13.509 0-24.5 10.99-24.5 24.5s10.991 24.499 24.5 24.499c4.81 0 9.296-1.398 13.084-3.801.205.339.462.666.77.974l16.142 16.143a5.966 5.966 0 0 0 4.244 1.756 5.964 5.964 0 0 0 4.243-1.756 5.961 5.961 0 0 0 1.756-4.242 5.971 5.971 0 0 0-1.757-4.244zM7.631 28.465c0-11.304 9.196-20.5 20.5-20.5 11.305 0 20.5 9.196 20.5 20.5 0 11.305-9.197 20.499-20.5 20.499-11.304 0-20.5-9.194-20.5-20.499zm56.153 34.986c-.757.754-2.074.754-2.83 0L44.813 47.309c-.14-.139-.192-.232-.199-.232.003-.043.058-.455 1.201-1.596 1.14-1.143 1.552-1.195 1.565-1.203.026.008.119.06.263.203l16.14 16.141c.379.379.586.881.586 1.416a1.997 1.997 0 0 1-.585 1.413z"></path>
          </svg>
        </button>
      </div>
      <div className="users-list">
        {user.map((item) => (
          <ShowUnfllowUser key={item.id} user={item} />
        ))}
      </div>
    </aside>
  );
}

export function ShowUnfllowUser({ user }) {
   const { status, handle } = useHandleFollowers(user.id , user.status);
   const handuleClick = async () => {
    await handle();  
  };  
  return (
    <div>
      <Follow status={status} handuleClick ={handuleClick } user={user}/>
    </div>
  )
}

  export function Followers ({status, user}) {
    const [isSelected, setIsSelected] = useState(false);
  
    const handleSelect = (nickname) => {
      return () => {
        setIsSelected(!isSelected);
        if (!isSelected) {
          UsersSelected.push(nickname);
        } else {
          UsersSelected = UsersSelected.filter((item) => item !== nickname);
        }
      };
    };

    return (
      <div className="activity-item">
        <div>
          <p>
            <strong>
              <Link className="link" href={{ pathname: `/profile/${user.nickname}` }}>
                {user.lastName} {user.firstName}
              </Link>
            </strong>
          </p>
          <p className="text-muted">@{user.nickname || "N/A"}</p>
        </div>
        {status === "accept" && (
          <button className={isSelected || UsersSelected.includes(user.nickname) ? "Deselect" : "Select"} onClick={handleSelect(user.nickname)}> {isSelected || UsersSelected.includes(user.nickname) ? "Deselect" : "Select"}</button>
        )}
      </div>
    );
  }

