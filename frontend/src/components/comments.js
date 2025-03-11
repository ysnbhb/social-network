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
