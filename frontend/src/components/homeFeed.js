"use client";
import { useEffect, useRef, useState } from "react";
import "../styles/homeFeed.css";
import { PostCompte } from "./postComp";
import PostCreater from "./postCreate";

export default function HomeFeed({ className, classes = {} }) {
  const [posts, setPosts] = useState([]);
  const containerRef = useRef(null);
  let offset = 0;

  const GetPost = async () => {
    const response = await fetch(`/api/home/posts?offset=${offset}`, {
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
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      offset += 10;
      GetPost();
    }
  };

  useEffect(() => {
    GetPost();
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className={`${className} section-home`}>
      <PostCreater setPosts={setPosts} classes={classes} />
      {posts.map((post) => (
        <PostCompte key={post.id} post={post} />
      ))}
    </section>
  );
}
