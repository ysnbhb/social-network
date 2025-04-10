"use client";
import { useEffect, useState } from "react";
import "../styles/homeFeed.css";
import { PostCompte } from "./postComp";
import PostCreater from "./postCreate";
import IsLoading from "./isloading";
import { API_URL } from "./api";

export default function HomeFeed({ className, classes = {}  ,  ishome = true , groupid  , page = "/api/home/posts" , dadfollow}) {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  let offset = 0;

  const GetPost = async () => {
    setLoading(true);
    console.log('url',`${API_URL}${page}?offset=${offset}${groupid ? `&groupId=${groupid}` : ""}`);
    
    const response = await fetch(`${API_URL}${page}?offset=${offset}${groupid ? `&groupId=${groupid}` : ""}`, {
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
        <PostCreater setPosts={setPosts} classes={classes}  ishome={ishome} groupid={groupid} dataFollow={dadfollow}/>


        {posts.length === 0 && (
    <div className="no-data" >
      <h1>There are no posts</h1>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    </div>
  )}

        {posts.map((post) => (
          <PostCompte key={post.id} post={post} />
        ))}
        {loading && (
          <IsLoading></IsLoading>
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
