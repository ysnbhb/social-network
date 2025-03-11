"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import style from "./profile.module.css";
import styles from "./updateProfile.module.css";
import bag from "@/components/images/pxfuel.jpg";
import { PostCompte } from "../../../../components/postComp.js";
import useGetProfile from "@/app/hooks/useGetProfile";
import userProfile from "@/app/hooks/userProfile";
import IsLoading from "@/components/isloading";
import useHandleFollowers from "@/app/hooks/usehandleFollower";
import PopUpError from "@/components/popupError";
import { useRouter } from "next/navigation";
import { API_URL } from "@/components/api";

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
          {showPopup && <Updateprofile data={profiledata} />}

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

export function Updateprofile({data}) {
    console.log(data
    );
    
  return (
    <div className={styles.update}>
      <div className={styles.container}>
         <div className={styles.header}>
          <h2>Account Settings</h2>
          <button className={styles.closeButton}>×</button>
        </div>
         
           <h3>Your Avatar</h3>
          <div className={styles.avatarContainer}>
            
            <span className={styles["Circle-avart"]}>
                    <img
                      src={`${API_URL}${data.avatarUrl}`}
                      className={`${styles["avatarContainer-profile"]} ${style.avatarContainer}`}
                      srcSet=""
                      alt="User Avatar"
                      layout="fill"
                      objectfit="cover"
                    />
                  </span>
            
          
          <p className={styles.avatarText}>Avatar help your teammates recognize you in Unity.</p>
        </div>
        
        <hr className={styles.hr} />
        
        {/* Form fields - first row */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input 
              className={styles.input} 
              type="text" 
              defaultValue={data.firstName}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input 
              className={styles.input} 
              type="text" 
              defaultValue={data.lastName}
            />
          </div>
        </div>
        
        {/* Form fields - second row */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>User Name</label>
            <input 
              className={styles.input} 
              type="text" 
              defaultValue={data.nickName}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input 
              className={styles.input} 
              type="text" 
              defaultValue={data.email}
            />
          </div>
        </div>
        
        {/* Bio textarea */}
        <div className={styles.formGroup}>
          <label className={styles.label}>About Me</label>
          <textarea
            className={styles.textarea}
            rows="4"
            defaultValue={data.aboutMe}
          />
        </div>
        
        {/* Update profile button */}
        <button className={styles.updateButton}>
          Update Profile
        </button>
      </div>
    </div>
  );
  
}
