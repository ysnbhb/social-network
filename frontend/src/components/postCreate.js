import { useState, useEffect } from "react";
import "../styles/homeFeed.css";
import "../styles/groupsFeed.css";
import { CreatePost } from "../lib/createPost";
import userProfile from "@/app/hooks/userProfile";
import { API_URL } from "./api";
import useFollowing from "@/app/hooks/useFollowing";
import { Followers, ShowUnfllowUser } from "./activitySide";
import { UsersSelected } from "./activitySide";

export default function PostCreater({ setPosts, classes, ishome, groupid ,dataFollow}) {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("public");
  const [img, setImg] = useState(null);
  const [profiledata, errorPro] = userProfile();
  const [checkFollow, setcheckFollow] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { avatarUrl } = profiledata;
  console.log("UsersSelected", UsersSelected);
  const activeTab = 0
  const togglePopup = (data, text) => {
    setcheckFollow(text)
    // setdataFollow(data)
    setShowPopup(!showPopup);
}; 

  const handalPost = async (e) => {
    e.preventDefault();
    
    const res = await CreatePost(content, postType, img, groupid ? groupid : 0);

    if (res) {
      setContent("");
      setImg(null);
      setPostType("public");
      setPosts((prev) => [res, ...prev]);
    } else {
      // alert("errror");
    }
  };

  useEffect(() => {
    if (postType === "private") {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [postType]);

  return (
    <div className={`feed ${classes.div_feed}`}>
      <div className="post-creator">
        {avatarUrl ? (
          <img src={`${API_URL}${avatarUrl}`} alt="Post" className="avatar" />
        ) : (
          <div className="avatar"></div>
        )}
        <textarea
          name=""
          id=""
          placeholder="Share something..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <button
          onClick={(e) => {
            handalPost(e);
          }}
        >
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                id="new-post"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M1.25 7C1.25 3.82436 3.82436 1.25 7 1.25H17C20.1756 1.25 22.75 3.82436 22.75 7V17C22.75 20.1756 20.1756 22.75 17 22.75H11.5C11.0858 22.75 10.75 22.4142 10.75 22C10.75 21.5858 11.0858 21.25 11.5 21.25H17C19.3472 21.25 21.25 19.3472 21.25 17V7C21.25 4.65279 19.3472 2.75 17 2.75H7C4.65279 2.75 2.75 4.65279 2.75 7V17C2.75 19.3472 4.65279 21.25 7 21.25H7.5C7.91421 21.25 8.25 21.5858 8.25 22C8.25 22.4142 7.91421 22.75 7.5 22.75H7C3.82436 22.75 1.25 20.1756 1.25 17V7Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <span>Post</span>
        </button>
      </div>
      <div className="post-options">
        <div className="containe-image">
        <label className="image" htmlFor="img">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 32 32"
          >
            <path d="M24 1H8a7 7 0 0 0-7 7v16a7 7 0 0 0 7 7h16a7 7 0 0 0 7-7V8a7 7 0 0 0-7-7ZM8 3h16a5 5 0 0 1 5 5v9.26L25.36 13A3 3 0 0 0 23 12a3 3 0 0 0-2.29 1.17l-3.61 4.67a1 1 0 0 1-.68.38 1 1 0 0 1-.75-.22l-3.58-3a3 3 0 0 0-4 .13L3 20V8a5 5 0 0 1 5-5Zm16 26H8a5 5 0 0 1-5-5v-1.22l6.49-6.16a1 1 0 0 1 1.32 0l3.58 3a3 3 0 0 0 4.29-.48l3.62-4.67a1 1 0 0 1 .76-.39 1 1 0 0 1 .78.35l5.16 6V24a5 5 0 0 1-5 5Z"></path>
            <path d="M8.5 12A3.5 3.5 0 1 0 5 8.5 3.5 3.5 0 0 0 8.5 12Zm0-5A1.5 1.5 0 1 1 7 8.5 1.5 1.5 0 0 1 8.5 7Z"></path>
          </svg>
          <span>Image</span>
        </label>
        <input
          type="file"
          id="img"
          style={{ display: "none" }}
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
          accept="image/*"
        />
        {img && <div className="image-check">
         <img src="checkmark.png"/>
          </div>}
        </div>
        <div className="privacy">
          {ishome && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 68 68"
                id="earth"
              >
                <path d="M66 34a31.79 31.79 0 0 0-6.14-18.86 32.26 32.26 0 0 0-11.31-9.65h-.06c-.61-.31-1.23-.59-1.86-.86A32 32 0 0 0 2.24 30.11c-.07.54-.12 1.09-.16 1.64C2 32.49 2 33.25 2 34a32 32 0 0 0 56.84 20.18A32.05 32.05 0 0 0 66 34Zm-8.19 18.21a5.08 5.08 0 0 1-1.69-1.79 6.87 6.87 0 0 1-.24-5.8c.17-.43.37-.85.57-1.28a8 8 0 0 0 1.1-4.23 8.86 8.86 0 0 0-.53-2 3.73 3.73 0 0 1-.38-2.06 3.92 3.92 0 0 1 .75-1.2 5.25 5.25 0 0 0 1.13-2c.53-2.29-1.52-4.2-3.71-4.84-.58-.18-1.17-.29-1.75-.41a7.46 7.46 0 0 1-2.93-1 3.18 3.18 0 0 1 .72-5.55 7.63 7.63 0 0 1 3.06-.23h.59a6.41 6.41 0 0 0 4.56-1.19 2.18 2.18 0 0 0 .42-.49 29.94 29.94 0 0 1-1.67 34.05ZM34 4a30.2 30.2 0 0 1 11.58 2.33l.22.43c2.08 5.05-5.56 10.11-10.3 12.68l-.81.45-4.63 2.51a13 13 0 0 0-4.1 3 5.16 5.16 0 0 0-.81 5.51c1.78 3.3 6.57 2.37 8.14 2.07s5-.73 5.81 1.26c.38.9.55 2 .07 2.61-3.74 4.4-3.88 8.7-4 12.85a28.78 28.78 0 0 1-.6 5.89c-.43 1.81-1 2.78-1.82 2.87-1 .15-1.83-1.35-2-2.47-.07-.42-.11-.84-.16-1.26a7.74 7.74 0 0 0-1.2-4 8.13 8.13 0 0 0-3.06-2.2 4.75 4.75 0 0 1-2.48-1.9 4.93 4.93 0 0 1-.13-2.39 7.42 7.42 0 0 0-.12-3A7.31 7.31 0 0 0 21.14 38a8.31 8.31 0 0 1-1.63-1.76c-1-1.75-.41-4.06.46-6.67.81-2.43 1.65-5.93-.36-8.37a5 5 0 0 0-4.31-1.76 6.92 6.92 0 0 0-5.3 3 16.67 16.67 0 0 0-1.4 2.92c-.72 1.78-1.34 3.33-2.74 3.8a7.31 7.31 0 0 1-1.49.15A30.09 30.09 0 0 1 34 4Zm0 60A30 30 0 0 1 4 34c0-.7 0-1.41.07-2.11l.06-.57a9.19 9.19 0 0 0 2.37-.25c2.27-.78 3.17-3 4-5a15.32 15.32 0 0 1 1.21-2.57 4.9 4.9 0 0 1 3.73-2.07 3.21 3.21 0 0 1 2.67 1c1.36 1.66.72 4.33 0 6.47-.8 2.38-1.88 5.65-.29 8.32a9.83 9.83 0 0 0 2 2.23 5.77 5.77 0 0 1 1.84 2.28 5.79 5.79 0 0 1 0 2.21 6.51 6.51 0 0 0 .3 3.41 6.42 6.42 0 0 0 3.4 2.87 6.39 6.39 0 0 1 2.36 1.61 6.23 6.23 0 0 1 .82 3c0 .47.09.94.17 1.39.35 2.08 1.8 4.15 3.85 4.15a2.75 2.75 0 0 0 .4 0c2.53-.33 3.27-3.39 3.51-4.4a31.09 31.09 0 0 0 .65-6.28c.13-4 .26-7.76 3.55-11.62 1.09-1.3.84-3.27.24-4.69-1-2.38-3.87-3.25-8-2.45-3.26.63-5.28.28-6-1.05a3.18 3.18 0 0 1 .6-3.3A11.22 11.22 0 0 1 31 24.16l4.62-2.52.82-.44c8.38-4.54 12.34-9.2 11.61-13.7a30.18 30.18 0 0 1 10 8.55c-.05.73-.17 1-.28 1.09a4.69 4.69 0 0 1-3.17.71h-.57a9.16 9.16 0 0 0-3.87.36A5.18 5.18 0 0 0 49 27.23a9.09 9.09 0 0 0 3.71 1.31c.55.11 1.07.22 1.57.36 1.31.39 2.55 1.47 2.32 2.48a3.49 3.49 0 0 1-.75 1.25 5.39 5.39 0 0 0-1.11 1.92 5.35 5.35 0 0 0 .42 3.25 6.65 6.65 0 0 1 .43 1.52 6.36 6.36 0 0 1-.91 3.17c-.23.46-.45.93-.63 1.4a8.91 8.91 0 0 0 .35 7.51 7.27 7.27 0 0 0 2.18 2.37A29.86 29.86 0 0 1 34 64Z"></path>
              </svg>
              <select
                value={postType}
                onChange={(e) => {
                  setPostType(e.target.value);
                }}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="almostPrivate">Almost Private</option>
              </select>
            </>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2 className="popup-title">Select users who can see your post:</h2>
              <button className="popup-close" onClick={togglePopup}>
                &times;
              </button>
            </div>
            <div className="popup-form">
                      {dataFollow ? (dataFollow).map((fl) => (
                        <div key={`${activeTab}-${fl.id}`}>
                           <Followers  key={`${activeTab}-${fl.id}`} status={fl.status}   user={fl}/>
                         </div>
                      )) : (<div>
                        No Follower
                      </div>)}

              <div className="popup-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={togglePopup}
                >
                Cancel
                </button>
                <button type="submit" className="btn-create" onClick={(e) => {
                  e.preventDefault();
                  handleJoinGroup()
                }}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

