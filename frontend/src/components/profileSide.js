import useFollowing from "@/app/hooks/useFollowing";
import "../styles/profileSidebar.css";
import userProfile from "@/app/hooks/userProfile";
import Link from "next/link";
import {  useState } from "react";
import { API_URL } from "./api";
 import User from "./userFollowers";
export default function ProfileSide({ classes }) {
  const [activeTab, setActiveTab] = useState("following");
  const [showPopup, setShowPopup] = useState(false);
  const [checkFollow, setcheckFollow] = useState("");
  const [dataFollow, setdataFollow] = useState([]);
  const [profile, error] = userProfile();
  const [follow] = useFollowing();
  const togglePopup = (data, text) => {
    setcheckFollow(text)
    setdataFollow(data)
    setShowPopup(!showPopup);
  }; 

 
  // setJoinedGroup(prev => [...prev, data]);
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
        <div  className="content-area">
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="popup-header">
                <h2 className="popup-title">{checkFollow}</h2>
                <button className="popup-close" onClick={togglePopup} >
                  &times;
                </button>
              </div>
              <div className="popup-form">
              {dataFollow ?(dataFollow).map((fl) => (
                <div key={`${activeTab}-${fl.id}`}>
                    <User key={`${activeTab}-${fl.id}`}  user={fl} />
                 </div>
              )) :(<div>
                No Follower
              </div>)}
              </div>
            </div>
          </div>
        )}
      </div>
      {profile ? (
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div>
              {avatarUrl && (
                <img
                  src={`${API_URL}${avatarUrl}`}
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
              <p className="text-muted follow" onClick={() => togglePopup(follow.Follower, "Follower" ,setActiveTab("Follower"))}>
                Followers
              </p>
            </div>
            <div>
              <h3>{following_count}</h3>
              <p
                className="text-muted follow"
                onClick={() => togglePopup(follow.Following, "Following",setActiveTab("Following"))}
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


// function User({user}) {
//     const { status, handle } = useHandleFollowers(user.id , user.status);
//      const handuleClick = async () => {
//       await handle();  
//     };
//   return <>
//   <Follow  status={status}   user={user}  handuleClick={handuleClick} />
//   </>
// }