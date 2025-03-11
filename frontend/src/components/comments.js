"use client";
import { useEffect, useState } from "react";
import "../styles/homeFeed.css";
import { CommentCompte } from "./commentComp.js";
import CommentCreater from "./commentCreate.js";
import { useSearchParams } from "next/navigation";
import { API_URL } from "./api";
import { PostCompte } from "./postComp";

export default function Comments({ className, classes = {} }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [card, setCard] = useState(null);
  const id = searchParams.get("target_id");
  const GetComments = async () => {
    try {
      if (!id) {
        console.error("No target_id found in query parameters");
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await fetch(`${API_URL}/api/get/comments?target_id=${id}`, {
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

      if (data) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };;

  const GetCard = async()=> {
    if (!id) {
      console.error("No target_id found in query parameters");
      return;
    }
    const res = await fetch(`${API_URL}/api/get/card?cardId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (data && data.id) {
      setCard(data);
    }

  }


  useEffect(() => {
    GetCard();
    GetComments();
  }, [id]); 

  return (
    <>
      <section className={`${className || ""} section-home`}>
        {card && card.id && (
          <PostCompte post={card} />
        )}
        <CommentCreater setPosts={setPosts} classes={classes} />
        
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            post ? <CommentCompte key={post.id || index} comment={post} /> : null
          ))
        ) : !loading ? (
          <div className="no-data" >
          <h1>There are no comments</h1>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
          </svg>
        </div>
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
