"use client";
import { useState } from "react";
import "../styles/homeFeed.css";
import { useRouter } from "next/navigation";
import { API_URL } from "./api";

// Function to format date as "time ago"
export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);

  if (isNaN(secondsAgo) || secondsAgo < 0) {
    return "just now";
  }

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  let counter;
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    counter = Math.floor(secondsAgo / secondsInUnit);
    if (counter > 0) {
      return counter === 1 ? `1 ${unit} ago` : `${counter} ${unit}s ago`;
    }
  }

  return "just now";
}

export function CommentCompte({ comment, className, classes = {} }) {
  const router = useRouter();

  if (!comment) {
    return null; 
  }

  const {
    id = "",
    content = "",
    createdAt = "",
    firstName = "",
    isLiked = false,
    lastName = "",
    nickName = "",
    totalComments = 0,
    totalLikes = 0,
    avatarUrl = "",
    imageUrl
  } = comment || {};

  const formattedCreatedAt = timeAgo(createdAt);

  const [like, setLike] = useState(isLiked);
  const [likes, setLikes] = useState(totalLikes);

  const handleLike = async () => {
    if (!id) return;

    const res = await fetch(`${API_URL}/api/user/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId: id,
        ReactionType: 1,
      }),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      const { isliked, likesCount } = data;
      setLike(isliked);
      setLikes(likesCount);
    }
  };

  const handleIdUser = () => {
    if (!id) return;
    router.push(`/profile/${nickName}`);
  };

  const handleComment = () => {
    router.push("/comments?target_id=" + id);
  };

  return (
    <>
      <div className={`post ${classes.comment || ""} ${className || ""}`}>
        <div className="post-header">
          <div className="post-author">
            {avatarUrl ? (
              <img
                onClick={handleIdUser}
                src={API_URL + avatarUrl}
                alt="User avatar"
                className="avatar"
              />
            ) : (
              <div className="avatar" onClick={handleIdUser}></div>
            )}
            <div>
              <h4>{`${firstName} ${lastName}`}</h4>
              <p className="text-muted">{formattedCreatedAt}</p>
            </div>
          </div>
        </div>
        <p>{content}</p>
        {imageUrl && (
          <img
            src={`${API_URL}/${imageUrl}`}
            alt="Post"
            className="image-posts"
            style={{ width: "100%", height: "auto",borderRadius:"10px" }}
          />
        )}
        <div className="post-actions">
          <div className={`like${like ? " active" : ""}`} onClick={handleLike}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="heart"
            >
              <g
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transform="translate(2.5 3)"
              >
                <path d="M9.26100981 17.8537669C7.09039739 16.5178915 5.07111022 14.9456454 3.2392904 13.1651694 1.95143752 11.8829466.9710055 10.3197719.373096631 8.59538613-.702856235 5.25030481.553929046 1.42082647 4.07111951.287520227 5.91961305-.307565201 7.93844933.0325524403 9.49609195 1.20147687L9.49609195 1.20147687C11.0543328.0339759987 13.0724617-.306022468 14.9210644.287520227 18.4382548 1.42082647 19.7040817 5.25030481 18.6281289 8.59538613 18.03022 10.3197719 17.049788 11.8829466 15.7619351 13.1651694 13.9301153 14.9456454 11.9108281 16.5178915 9.7402157 17.8537669L9.50513357 18 9.26100981 17.8537669zM13.2393229 4.0530216C14.3046302 4.39332197 15.061552 5.34972367 15.1561465 6.47500671"></path>
              </g>
            </svg>
            <span>{likes}</span>
          </div>
          <div className="comment" onClick={handleComment}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="chat"
            >
              <g
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                transform="translate(2 2)"
              >
                <path d="M10.0568181,-3.37507799e-14 C6.54686532,-0.0141015786 3.28556632,1.80703838 1.46050022,4.80034679 C-0.364565872,7.7936552 -0.487081058,11.5223413 1.13756771,14.6286303 L1.33789312,15.0191059 C1.50209106,15.3263704 1.53643729,15.6864194 1.43328617,16.0191043 C1.14742034,16.7783674 0.908488743,17.5544276 0.71783828,18.3429101 C0.71783828,18.7429095 0.832309942,18.9714806 1.26157868,18.9619568 C2.02189879,18.7940564 2.77067506,18.5777416 3.5033154,18.3143388 C3.81886183,18.2274425 4.15437035,18.2475403 4.45724592,18.3714815 C4.73388577,18.5048146 5.29670478,18.8476712 5.31578339,18.8476712 C8.99153503,20.7804333 13.4807954,20.2472199 16.5997521,17.5074142 C19.7187087,14.7676084 20.8198838,10.3899785 19.3676078,6.50403406 C17.9153318,2.6180896 14.211089,0.0305307279 10.0568181,-3.37507799e-14 L10.0568181,-3.37507799e-14 Z"></path>
                <circle cx="5.287" cy="10" r="1" fill="#200E32"></circle>
                <circle cx="10.057" cy="10" r="1" fill="#200E32"></circle>
                <circle cx="14.826" cy="10" r="1" fill="#200E32"></circle>
              </g>
            </svg>
            <span>{totalComments}</span>
          </div>
        </div>
      </div>
    </>
  );
}
