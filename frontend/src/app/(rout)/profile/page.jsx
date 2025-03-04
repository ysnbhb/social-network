"use client";
import { useState } from "react";
import Image from "next/image";
import style from "./profile.module.css";
 import bag from "../../../components/images/pxfuel.jpg";
import { PostCompte } from "../../../components/postComp.js";
import useGetProfile from "@/app/hooks/useGetProfile";
import userProfile from "@/app/hooks/userProfile";

export default function Profile() {
  const [profiledata, errorPro] = userProfile();
  const {
    avatarUrl,
    firstName,
    follower_count,
    following_count,
    lastName,
    aboutMe,
    nickName,
    posts_count,
  } = profiledata;
  console.log(profiledata);

  const [profile, error] = useGetProfile();
  const [err, setErr] = useState(null);

  const menuData = [
    { fullname: "Omar Rharbi", time: "30m", button: "Follow", image: " " },
    { fullname: "John Doe", time: "1h", button: "Follow", image: " " },
    { fullname: "Jane Smith", time: "2h", button: "Follow", image: " " },
  ];

  const FollowingData = [
    { fullname: "Omar Rharbi", time: "30m", button: "Follow", image: " " },
    {
      fullname: "John Doe",
      time: "1h",
      button: "Follow",
      image: " ",
    },
    {
      fullname: "Jane Smith",
      time: "2h",
      button: "Follow",
      image: " ",
    },
    {
      fullname: "Jane Smith",
      time: "2h",
      button: "Follow",
      image: " ",
    },
  ];

  return (
    <div>
      <div className={style.container}>
        <div className={style["card-profile"]}>
          <div className={style["card-profile-posts"]}>
            <div className={`${style["avatar-user"]}`}>
              <Image
                 src={bag}
                alt=""
                srcSet=""
                className={`${style["bground"]} ${style.avatarContainer}`}
                objectFit="cover"
              />
            </div>
            <div className={style.buttonContainer}>
              <button className={style.followButton}>Follow</button>
              <button className={style.moreButton}>Send Message</button>
            </div>
            <span className={style["Circle-image"]}>
              <img
                src={avatarUrl}
                className={`${style["avatarContainer-profile"]} ${style.avatarContainer}`}
                srcSet=""
                alt="User Avatar"
                layout="fill"
                objectFit="cover"
              />
            </span>

            <div className={style["user"]}>
              <div className={style.content}>
                <div className={style.about}>
                  <h1 className={style.name}>{`${firstName} ${lastName}`} </h1>
                  <p className={style.jobTitle}>{aboutMe}</p>
                </div>
                <div className={style.stats}>
                  <span className={style.statText}>
                    <span className={style.statNumber}>{follower_count}</span>{" "}
                    followers
                  </span>
                  <span className={style.statText}>
                    <span className={style.statNumber}>{following_count}</span>{" "}
                    following
                  </span>
                </div>
              </div>
            </div>
          </div>
          {!error &&
            profile.map((post) => (
              <PostCompte
                className={style["image"]}
                classes={{post:style["posts-profile"]}}
                key={post.id}
                post={post}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
