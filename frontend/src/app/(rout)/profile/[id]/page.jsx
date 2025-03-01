"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import style from "./profile.module.css";
import image from "../../../../components/images/IMG-20240514-WA0002.jpg";
import bag from "../../../../components/images/image6.jpg";
import ActivitySidebar from "../../../../components/activitySide";
import HomeFeed from "../../../../components/homeFeed";
import { Profile_Posts } from "../../../../lib/profilePost.js";
 import { Context } from "../../../../lib/Context";
import { PostCompte } from "../../../../components/postComp.js";

export default function Profile({ params }) {
  const contextValues = useContext(Context);
  console.log(contextValues.dataProfile);

  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await Profile_Posts();
  //       setData(result);
  //     } catch (error) {
  //       setErr(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
              <Image
                src={image}
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
                  <h1 className={style.name}>Rharbi Omar</h1>
                  <p className={style.jobTitle}>
                    Passionate programmer & problem solver 🔹 Student at Zone 01
                    Oujda – Peer-to-peer learning & innovation 🔹 Always
                    exploring new technologies
                  </p>
                </div>
                <div className={style.stats}>
                  <span className={style.statText}>
                    <span className={style.statNumber}>6,476</span> followers
                  </span>
                  <span className={style.statText}>
                    <span className={style.statNumber}>500+</span> following
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <HomeFeed
            className={`${style.Homefeed}`}
            classes={{ div_feed: style["custom-feed-class"] }}
            data={data}
          /> */}
          {data.map((post) => (
            <PostCompte
              className={`${style.Homefeed}`}
              key={post.id}
              post={post}
            />
          ))}
        </div>

        <div className={style["card-users"]}>
          <ActivitySidebar
            className={`${style.ActivitySidebar}`}
            classes={menuData}
            title="followers"
          />

          <ActivitySidebar
            className={`${style.ActivitySidebar}`}
            classes={FollowingData}
            title="following"
          />
        </div>
      </div>
    </div>
  );
}
