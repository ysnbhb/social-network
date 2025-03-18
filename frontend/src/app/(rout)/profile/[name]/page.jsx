"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import style from "./profile.module.css";
// import "../../../../styles/homeFeed.css";
import "../../../../styles/activitySidebar.css";
import bag from "@/components/images/pxfuel.jpg";
import { PostCompte } from "../../../../components/postComp.js";
import useGetProfile from "@/app/hooks/useGetProfile";
import userProfile from "@/app/hooks/userProfile";
import IsLoading from "@/components/isloading";
import useHandleFollowers from "@/app/hooks/usehandleFollower";
import PopUpError from "@/components/popupError";
import { useRouter } from "next/navigation";
import { API_URL } from "@/components/api";
import Link from "next/link";
import useFollowing from "@/app/hooks/useFollowing";
import User from "@/components/userFollowers";

export default function Profile({ params }) {
  const router = useRouter();
  const serverParams = use(params);
  const usernames = serverParams.name;
  console.log(usernames);
  
  const [cookie, setcookies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, error] = useGetProfile(usernames);
  const [profiledata, errorPro] = userProfile(usernames);
  const [checkFollow, setcheckFollow] = useState("");
  const [dataFollow, setdataFollow] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("following");

  const [follow] = useFollowing(usernames);
  const togglePopup = (data, text) => {
    setcheckFollow(text);
    setdataFollow(data);
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const allCookies = document.cookie;
    const sessionCookie = allCookies.split("session_id=")[1];
    setcookies(sessionCookie);
  }, []);

  const {
    uuid,
    id,
    avatarUrl,
    firstName,
    follower_count,
    following_count,
    lastName,
    aboutMe,
    nickName,
    posts_count,
  } = profiledata;
  const isOwnProfile = uuid === cookie;
  const { status, handle } = useHandleFollowers(id);
  const handleClick = async () => {
    await handle();
  };

  useEffect(() => {
    if (firstName && lastName) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [firstName, lastName]);

  return (
    <div>
      {errorPro ? (
        <PopUpError />
      ) : (
        <div>
          {isLoading ? (
            <IsLoading></IsLoading>
          ) : (
            <div className={style.container}>
              <div className={style["card-profile"]}>
                {showPopup && (
                  <div className="popup-overlay">
                    <div className="popup-content">
                      <div className="popup-header">
                        <h2 className="popup-title">{checkFollow}</h2>
                        <button className="popup-close" onClick={togglePopup}>
                          &times;
                        </button>
                      </div>
                      <div className="popup-form">
                        {dataFollow ? (
                          dataFollow.map((fl) => (
                            <div key={`${activeTab}-${fl.id}`}>
                              <User key={`${activeTab}-${fl.id}`} user={fl}   />
                            </div>
                          ))
                        ) : (
                          <div>No Follower</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className={style["card-profile-posts"]}>
                  {/* Cover photo */}
                  <div className={`${style["avatar-user"]}`}>
                    <Image
                      src={bag}
                      alt="Cover Photo"
                      srcSet=""
                      className={`${style["bground"]} ${style.avatarContainer}`}
                      objectfit="cover"
                      priority
                    />
                  </div>

                  {/* Profile photo */}
                  <span className={style["Circle-image"]}>
                    <img
                      src={`${API_URL}${avatarUrl}`}
                      className={`${style["avatarContainer-profile"]} ${style.avatarContainer}`}
                      srcSet=""
                      alt="User Avatar"
                      layout="fill"
                      objectfit="cover"
                    />
                  </span>

                  {/* Action buttons */}
                  <div className={style.buttonContainer}>
                    {isOwnProfile ? (
                      <div>
                        <Link
                          href={{ pathname: `/setting/${nickName}` }}
                          className={style.moreButton}>
                          Edit Profile
                        </Link>
                      </div>
                    ) : (
                      <div>
                        {status === "accept" ? (
                          <button
                            className={style.followButton}
                            onClick={() => handleClick(id)}>
                            unfollow
                          </button>
                        ) : status === "pending" ? (
                          <button className={style.followButton}>
                            pending
                          </button>
                        ) : profiledata.isFollowing ? (
                          <button
                            className={style.followButton}
                            onClick={() => handleClick(id)}>
                            unfollow
                          </button>
                        ) : (
                          <button
                            className={style.followButton}
                            onClick={() => handleClick(id)}>
                            follow
                          </button>
                        )}
                        <button
                          onClick={() => {
                            router.push(`/chat/${nickName}`);
                          }}
                          className={style.moreButton}>
                          Send Message
                        </button>
                      </div>
                    )}
                  </div>

                  {/* User info */}
                  <div className={style["user"]}>
                    <div className={style.content}>
                      <div className={style.about}>
                        <h1 className={style.name}>
                          {`${firstName} ${lastName}`}
                          <span>{` @${nickName}`} </span>{" "}
                        </h1>

                        <h1 className={style["about-me"]}>About Me</h1>
                        <p className={style.jobTitle}>{aboutMe}</p>
                      </div>

                      <div className={style.stats}>
                        <span
                          className={style.statText}
                          onClick={() =>
                            togglePopup(
                              follow.Follower,
                              "Follower",
                              setActiveTab("Follower")
                            )
                          }>
                          <span className={style.statNumber}>
                            {follower_count}
                          </span>{" "}
                          followers
                        </span>
                        <span
                          className={style.statText}
                          onClick={() =>
                            togglePopup(
                              follow.Following,
                              "Following",
                              setActiveTab("Following")
                            )
                          }>
                          <span className={style.statNumber}>
                            {following_count}
                          </span>{" "}
                          following
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {profile.map((post) => (
                  <PostCompte
                    className={style["image"]}
                    classes={{ post: style["posts-profile"] }}
                    key={post.id}
                    post={post}
                  />
                ))}
                {error}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
