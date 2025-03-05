import { useState } from "react";
import "../styles/homeFeed.css";
import { CreatePost } from "../lib/createPost";
import userProfile from "@/app/hooks/userProfile";

export default function PostCreater({setPosts , classes}) {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("public");
  const [img, setImg] = useState(null);
  const [profiledata, errorPro] = userProfile();
  const {
    avatarUrl,  
    } = profiledata;

  const handalPost = async (e) => {
    e.preventDefault();
    const res = await CreatePost(content, postType, img);
     
    if (res) {
      setContent("");
      setImg(null);
      setPostType("public");
      setPosts(prev=> [res ,...prev]);
    } else {
      // alert("errror");
    }
  };
    return (
      
      <div className={`feed ${classes.div_feed}`}>
     
    <div>
      {/* Post Creator Section */}
      <div className="post-creator">
        {avatarUrl ? (
          <img src={`${avatarUrl}`} alt="Post" className="avatar" />
        ) : (
          <div className="avatar"></div>
        )}
        <textarea
          name=""
          id=""
          placeholder="Share something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={(e) => handalPost(e)}>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                id="new-post"
              >
                {/* SVG content */}
              </svg>
            </div>
          </div>
          <span>Post</span>
        </button>
      </div>

      {/* Post Options Section */}
      <div className="post-options">
        {/* Image Upload */}
        <label className="image" htmlFor="img">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 32 32"
          >
            {/* SVG content */}
          </svg>
          <span>Image</span>
        </label>
        <input
          type="file"
          id="img"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
          accept="image/*"
        />

        {/* Privacy Settings */}
        <div className="privacy">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 68 68"
            id="earth"
          >
            {/* SVG content */}
          </svg>
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="almostPrivate">Almost Private</option>
          </select>
        </div>
      </div>
    </div>
  
</div>
 
    )
}