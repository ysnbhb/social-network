"use client";
import { useEffect, useState } from "react";
import "../styles/homeFeed.css";
import { CommentCompte } from "./commentComp.js";
import CommentCreater from "./commentCreate.js";
import { useSearchParams } from "next/navigation";

export default function Comments({ className, classes = {} }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const searchParams = useSearchParams();

  const GetComments = async () => {
    try {
      const id = searchParams.get("target_id");
      if (!id) {
        console.error("No target_id found in query parameters");
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await fetch(`/api/get/comments?target_id=${id}&offset=${offset}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      if (!response.ok) {
        console.error("Failed to fetch comments:", response.status);
        setLoading(false);
        return;
      }
      
      const data = await response.json();

      if (data && Array.isArray(data) && data.length > 0) {
        setPosts((prev) => {
          const uniquePosts = [...prev, ...data].reduce((acc, post) => {
            if (post && post.id && !acc.some((p) => p && p.id === post.id)) {
              acc.push(post);
            }
            return acc;
          }, []);
          return uniquePosts;
        });
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = throttle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      setOffset(prevOffset => prevOffset + 10);
    }
  }, 1000);

  useEffect(() => {
    if (offset > 0) {
      GetComments();
    }
  }, [offset]);

  useEffect(() => {
    setPosts([]); // Clear old comments when target_id changes
    setOffset(0); // Reset offset to load fresh comments
    GetComments();
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchParams]); // Add searchParams as dependency to refetch when it changes

  return (
    <>
      <section className={`${className || ""} section-home`}>
        <CommentCreater setPosts={setPosts} classes={classes} />
        
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            post ? <CommentCompte key={post.id || index} comment={post} /> : null
          ))
        ) : !loading ? (
          <div className="no-comments">No comments found</div>
        ) : null}
        
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