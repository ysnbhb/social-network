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
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/components/api";
import useEditProfile from "@/app/hooks/useEditProfile";
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
          {showPopup && (
            <Updateprofile
              data={profiledata}
              show={showPopup}
              setShowPopup={setShowPopup}
            />
          )}

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

export function Updateprofile({ data, show, setShowPopup }) {
  const router = useRouter();
  const [profileType, setProfileType] = useState("Public");
  const params = useParams();
  const name = params.name;
  const [profile, setProfile] = useState({ username: name });
  const updatedProfile = useEditProfile(profile);

  const handleRadioChange = (event) => {
    setProfileType(event.target.value);
  };
  const handleSignUp = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("profile_type", profileType);
    const formObject = {};
    for (const [key, value] of formData.entries()) {
      formObject[key] = value;
    }
    setProfile(formObject);
    router.push(`/profile/${formObject.nickName}`);
   };
  const change = () => {
     
    router.push(`/profile/${data.nickName}`);
    router.refresh();
  };
  const togglePopup = () => {
    setShowPopup(!show);
  };

  return (
    <div>
      {show && (
        <div className={styles.update}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h2>Account Settings</h2>
              <button className={styles.closeButton} onClick={togglePopup}>
                ×
              </button>
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
              <p className={styles.avatarText}>
                Avatar help your teammates recognize you in Social Network .
              </p>
            </div>

            <hr className={styles.hr} />
            <form onSubmit={handleSignUp}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>First Name</label>
                  <input
                    className={styles.input}
                    type="text"
                    defaultValue={data.firstName}
                    name="firstName"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Last Name</label>
                  <input
                    className={styles.input}
                    type="text"
                    defaultValue={data.lastName}
                    name="lastName"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>User Name</label>
                  <input
                    className={styles.input}
                    type="text"
                    defaultValue={data.nickName}
                    name="nickName"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    className={styles.input}
                    type="text"
                    defaultValue={data.email}
                    name="email"
                  />
                </div>
              </div>

              <div className={styles["formRow-radio"]}>
                <label className={styles.label}>Type Profile</label>
                <div className={styles.formradio}>
                  <label className={styles.label}>Public</label>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="profile_type"
                    value="Public"
                    checked={profileType === "Public"}
                    onChange={handleRadioChange}
                  />

                  <label className={styles.label}>Private</label>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="profile_type"
                    value="Private"
                    checked={profileType === "Private"}
                    onChange={handleRadioChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>About Me</label>
                <textarea
                  className={styles.textarea}
                  rows="4"
                  name="aboutMe"
                  defaultValue={data.aboutMe}
                />
              </div>

              {/* Update profile button */}
              <button className={styles.updateButton} onClick={change}>
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
