import { useState } from "react";
import { useSearchParams } from "next/navigation";
import "../styles/homeFeed.css";
import { CreateComment } from "../lib/createComment.js";
import userProfile from "@/app/hooks/userProfile";

export default function CommentCreater({ setPosts, classes, ishome, groupid }) {
  const [content, setContent] = useState("");
  const [profiledata, errorPro] = userProfile();
  const [img, setImg] = useState(null);
  const { avatarUrl } = profiledata;

  const searchParams = useSearchParams();
  const target = searchParams.get("target_id");

  const handalPost = async (e) => {
    e.preventDefault();

    if (!target) {
      console.error("No target_id found in URL");
      return;
    }

    const res = await CreateComment(
      content,
      target,
      img,
      groupid ? groupid : 0
    );

    if (res) {
      console.log(res);
      
      setContent("");
      setImg(null);
      setPosts((prev) => [res, ...prev]);
    } else {
      console.error("Failed to create comment");
    }
  };

  return (
    <div className={`feed ${classes.div_feed}`}>
      <div className="post-creator">
        <textarea
          placeholder="Comment something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <label className="image" htmlFor="img">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 32 32"
          >
            <path d="M24 1H8a7 7 0 0 0-7 7v16a7 7 0 0 0 7 7h16a7 7 0 0 0 7-7V8a7 7 0 0 0-7-7ZM8 3h16a5 5 0 0 1 5 5v9.26L25.36 13A3 3 0 0 0 23 12a3 3 0 0 0-2.29 1.17l-3.61 4.67a1 1 0 0 1-.68.38 1 1 0 0 1-.75-.22l-3.58-3a3 3 0 0 0-4 .13L3 20V8a5 5 0 0 1 5-5Zm16 26H8a5 5 0 0 1-5-5v-1.22l6.49-6.16a1 1 0 0 1 1.32 0l3.58 3a3 3 0 0 0 4.29-.48l3.62-4.67a1 1 0 0 1 .76-.39 1 1 0 0 1 .78.35l5.16 6V24a5 5 0 0 1-5 5Z"></path>
            <path d="M8.5 12A3.5 3.5 0 1 0 5 8.5 3.5 3.5 0 0 0 8.5 12Zm0-5A1.5 1.5 0 1 1 7 8.5 1.5 1.5 0 0 1 8.5 7Z"></path>
          </svg>
          <span>Image</span>
        </label>
        <input
          type="file"
          id="img"
          style={{ display: "none" }}
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
          accept="image/*"
        />
        <button onClick={handalPost}>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M1.25 7C1.25 3.82436 3.82436 1.25 7 1.25H17C20.1756 1.25 22.75 3.82436 22.75 7V17C22.75 20.1756 20.1756 22.75 17 22.75H11.5C11.0858 22.75 10.75 22.4142 10.75 22C10.75 21.5858 11.0858 21.25 11.5 21.25H17C19.3472 21.25 21.25 19.3472 21.25 17V7C21.25 4.65279 19.3472 2.75 17 2.75H7C4.65279 2.75 2.75 4.65279 2.75 7V17C2.75 19.3472 4.65279 21.25 7 21.25H7.5C7.91421 21.25 8.25 21.5858 8.25 22C8.25 22.4142 7.91421 22.75 7.5 22.75H7C3.82436 22.75 1.25 20.1756 1.25 17V7Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V6C11.25 5.58579 11.58579 5.25 12 5.25Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
}
