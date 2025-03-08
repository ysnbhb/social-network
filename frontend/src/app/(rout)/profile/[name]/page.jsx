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
 
export default function Profile({ params }) {
  const serverParams = use(params);
  const usernames = serverParams.name; 
  const [userLogin, setUserLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  
  const [profile, error] = useGetProfile(usernames);
  const [profiledata, errorPro] = userProfile(usernames);
  const {
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
  const { status, handle } = useHandleFollowers(id);

  const handuleClick = async () => {
    console.log(id, "test here");

    await handle();
  };
  // useEffect(() => {
  //   if (errorPro && errorPro.length > 0) {
  //     const errorMessage = errorPro;
  //     const url = `/error?message=${encodeURIComponent(errorMessage)}`;
  //     router.push(url);
  //   }
  // }, [errorPro, router]);
  useEffect(() => {
    if (firstName && lastName) {
       const timer = setTimeout(() => {
        setIsLoading(false);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [firstName, lastName]);

  // const menuData = [
  //   { fullname: "Omar Rharbi", time: "30m", button: "Follow", image: " " },
  //   { fullname: "John Doe", time: "1h", button: "Follow", image: " " },
  //   { fullname: "Jane Smith", time: "2h", button: "Follow", image: " " },
  // ];

  // const FollowingData = [
  //   { fullname: "Omar Rharbi", time: "30m", button: "Follow", image: " " },
  //   {
  //     fullname: "John Doe",
  //     time: "1h",
  //     button: "Follow",
  //     image: " ",
  //   },
  //   {
  //     fullname: "Jane Smith",
  //     time: "2h",
  //     button: "Follow",
  //     image: " ",
  //   },
  //   {
  //     fullname: "Jane Smith",
  //     time: "2h",
  //     button: "Follow",
  //     image: " ",
  //   },
  // ];
  const isOwnProfile = nickName === userLogin;
  return (
    <div>
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
                    <button className={style.moreButton}>Edit Profile</button>
                  </div>
                ) : (
                  <div>
                    {status === "accept" ? (
                      <button className={style.followButton}>unfollow</button>
                    ) : status === "pending" ? (
                      <button className={style.followButton}>pending</button>
                    ) : (
                      <button
                        className={style.followButton}
                        onClick={() => handuleClick(id)}
                      >
                        follow
                      </button>
                    )}

                    <button className={style.moreButton}>Send Message</button>
                  </div>
                )}
              </div>

              {/* User info */}
              <div className={style["user"]}>
                <div className={style.content}>
                  <div className={style.about}>
                    <h1 className={style.name}>{`${firstName} ${lastName}`}</h1>
                    <h1 className={style["about-me"]}>About Me</h1>
                    <p className={style.jobTitle}>{aboutMe}</p>
                  </div>

                  <div className={style.stats}>
                    <span className={style.statText}>
                      <span className={style.statNumber}>{follower_count}</span>{" "}
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
  );
}
