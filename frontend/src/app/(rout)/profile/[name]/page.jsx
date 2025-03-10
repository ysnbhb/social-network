"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import style from "./profile.module.css";
import bag from "@/components/images/pxfuel.jpg";
import { PostCompte } from "../../../../components/postComp.js";
import useGetProfile from "@/app/hooks/useGetProfile";
import userProfile from "@/app/hooks/userProfile";
import IsLoading from "@/components/isloading";
import useHandleFollowers from "@/app/hooks/usehandleFollower";
import PopUpError from "@/components/popupError";
import { useRouter } from "next/navigation";
import styles from "./updateProfile.module.css";

export default function Profile({ params }) {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const serverParams = use(params);
  const usernames = serverParams.name;
  const [cookie, setcookies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, error] = useGetProfile(usernames);
  const [profiledata, errorPro] = userProfile(usernames);
  const togglePopup = () => {
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
          {showPopup && <Updateprofile />}

          {isLoading ? (
            <IsLoading></IsLoading>
          ) : (
            <div className={style.container}>
              <div className={style["card-profile"]}>
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
                      src={avatarUrl}
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
                        <button
                          onClick={togglePopup}
                          className={style.moreButton}>
                          Edit Profile
                        </button>
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
                        <h1
                          className={
                            style.name
                          }>{`${firstName} ${lastName}`}</h1>
                        <h1 className={style["about-me"]}>About Me</h1>
                        <p className={style.jobTitle}>{aboutMe}</p>
                      </div>

                      <div className={style.stats}>
                        <span className={style.statText}>
                          <span className={style.statNumber}>
                            {follower_count}
                          </span>{" "}
                          followers
                        </span>
                        <span className={style.statText}>
                          <span className={style.statNumber}>
                            {following_count}
                          </span>{" "}
                          following
                        </span>
                      </div>

                      {/* Skill tags to match example */}
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

export function Updateprofile() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Account Settings</h2>
          <button>&times;</button>
        </div>
        <div className={styles.tabs}>
          <button className={styles.active}>Profile</button>
          <button>Password</button>
          <button>Email</button>
          <button>Notification</button>
          <button>Settings</button>
        </div>
        <div className={styles["avatar-section"]}>
          <img src="https://via.placeholder.com/60" alt="Avatar" />
          <div>
            <button>Upload New</button>
            <button>Delete Avatar</button>
          </div>
        </div>
        <p>Avatar helps your teammates recognize you in Unity.</p>
        <hr />
        <div className={styles["form-group"]}>
          <label>Your Full Name</label>
          <input type="text"  />
        </div>
        <div className={styles["form-group"]}>
          <label>Role</label>
          <input type="text"  />
        </div>
        <div className={styles["form-group"]}>
          <label>Location</label>
          <input type="text" />
        </div>
        <div className={styles["form-group"]}>
          <label>Company</label>
          <input type="text"  />
        </div>
        <div className={styles["form-group"]}>
          <label>Bio</label>
          <textarea rows="4" onChange={()=>{const tes=""}}>
              Lead Visual Designer at @Lenovo - Email: dbubu@writetome.net
          </textarea>
        </div>
        <button className={styles["update-profile-btn"]}>Update Profile</button>
      </div>
    </div>
  );
}
