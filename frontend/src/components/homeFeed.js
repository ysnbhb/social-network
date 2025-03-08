"use client";
import { useEffect, useState } from "react";
import "../styles/homeFeed.css";
import { PostCompte } from "./postComp";
import PostCreater from "./postCreate";

export default function HomeFeed({ className, classes = {}  ,  ishome = true , groupid  , page = "/api/home/posts"}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  let offset = 0;

  const GetPost = async () => {
    setLoading(true);
    const response = await fetch(`${page}?offset=${offset}${groupid ? `&groupId=${groupid}` : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (data)
      setPosts((prev) => {
        const uniquePosts = [...prev, ...data].reduce((acc, post) => {
          if (!acc.some((p) => p.id === post.id)) {
            acc.push(post);
          }
          return acc;
        }, []);
        return uniquePosts;
      });
    else window.removeEventListener("scroll", handleScroll);
    setLoading(false);
  };

  const handleScroll = throttle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      offset += 10;
      GetPost();
    }
  }, 1000);

  useEffect(() => {
    GetPost();
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <section className={`${className} section-home`}>
        <PostCreater setPosts={setPosts} classes={classes}  ishome={ishome} groupid={groupid}/>
        {posts.map((post) => (
          <PostCompte key={post.id} post={post} />
        ))}
        {loading && (
          <div className="rl-loading-container">
            <div className="rl-loading-thumb rl-loading-thumb-1"></div>
            <div className="rl-loading-thumb rl-loading-thumb-2"></div>
            <div className="rl-loading-thumb rl-loading-thumb-3"></div>
          </div>
        )}
      </section>
    </>
  );
}

const throttle = (func, wait = 10) => {
  let shouldWait = false;
  let waitArg;
  const timeFunc = () => {
    if (!waitArg) shouldWait = false;
    else {
      func(...waitArg);
      waitArg = null;
      setTimeout(timeFunc, wait);
    }
  };
  return (...arg) => {
    if (shouldWait) {
      waitArg = arg;
      return;
    }
    func(...arg);
    shouldWait = true;
    setTimeout(timeFunc, wait);
  };
};
