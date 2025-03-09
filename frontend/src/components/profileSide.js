import useFollowing from "@/app/hooks/useFollowing";
import "../styles/profileSidebar.css";
import userProfile from "@/app/hooks/userProfile";
import Link from "next/link";
 import { useState } from "react";
import PopupFollower from "./popupFollower";
export default function ProfileSide({ classes }) {
  const [showPopup, setShowPopup] = useState(false);
   const [profile, error] = userProfile();
  const [follow, errorfollow] = useFollowing();
  const  togglePopup =()=>{
      console.log(follow.Following);
          setShowPopup(!showPopup)
        }
      
  const {
    avatarUrl,
    firstName,
    follower_count,
    following_count,
    lastName,
    nickName,
    posts_count,
  } = profile;
  return (
    <div className="profile-page">
      {showPopup && <PopupFollower />}
      {profile ? (
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div>
              {avatarUrl && (
                <img
                  src={`${avatarUrl}`}
                  alt="Post"
                  style={{ width: "65px", height: "65px", borderRadius: "50%" }}
                />
              )}
            </div>
            <h2>
              {firstName} {lastName}
            </h2>
            <p className="text-muted">@{nickName}</p>
          </div>
          <div className="profile-stats">
            <div>
              <h3>{posts_count}</h3>
              <p className="text-muted">Post</p>
            </div>
            <div>
              <h3>{follower_count}</h3>
              <p
                className="text-muted follow"
                 onClick={() => togglePopup()}
              >
                Followers
              </p>
            </div>
            <div>
              <h3>{following_count}</h3>
              <p
                className="text-muted follow"
                // onClick={() => handleFollowers("Following")}
              >
                Following
              </p>
            </div>
          </div>
          <Link className="link" href={{ pathname: `/profile/${nickName}` }}>
            <button className="profile-button">My Profile</button>
          </Link>
        </aside>
      ) : (
        <div className="error-message">
          <p>{error.message || "An unexpected error occurred."}</p>
        </div>
      )}
    </div>
  );
}
