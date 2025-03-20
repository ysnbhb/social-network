import Link from "next/link";
 import "../styles/profileSidebar.css";
import "../styles/groupsFeed.css";
export  default function Follow ({status,handuleClick,user}){
  // console.log(user );
  
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
        
        { status === "accept" ? (
          <button onClick={() => handuleClick(user.id)}>unfollow</button>
        ) :  status === "pending" ? (
          <button>pending</button>
        ) : (
          <button onClick={() => handuleClick(user.id)} >follow</button>
        )}
      </div>
    );
  }
  