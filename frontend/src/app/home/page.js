"use client"

import styles from "./page.module.css"
import notification from "../../component/notification.svg"
import image from "../../component/user.jpg"
import Image from 'next/image';
import { useState, useRef } from "react";
const dislike = "M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z"
const like = "M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"
const comment = "M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"
const userIcon = "M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"

export default function Home() {
    const [showUsersSidebar, setShowUsersSidebar] = useState(false);
    
    const toggleUsersSidebar = () => {
        setShowUsersSidebar(!showUsersSidebar);
    };
    
    const users = [
        { name: "user1", status: "Online" },
        { name: "user2", status: "Offline" },
        { name: "user3", status: "Online" },
        { name: "user4", status: "Offline" },
        // { name: "user5", status: "Online" },
        // { name: "user6", status: "Offline" },
        // { name: "user7", status: "Online" },
        // { name: "user8", status: "Offline" },
        // { name: "user9", status: "Online" },
        // { name: "user10", status: "Offline" },
        // { name: "user11", status: "Online" },
        // { name: "user12", status: "Offline" },
    ]
    const posts = [
        { name: "user1", title: "Title1", time: "10:50", content: "Paragraph 1" },
        { name: "user2", title: "Title2", time: "11:50", content: "Paragraph 2" },
        { name: "user3", title: "Title3", time: "12:50", content: "Paragraph 3" },
        // { name: "user4", title: "Title4", time: "13:50", content: "Paragraph 4" },
        // { name: "user5", title: "Title5", time: "14:50", content: "Paragraph 5" },
        // { name: "user6", title: "Title6", time: "15:50", content: "Paragraph 6" },
        // { name: "user7", title: "Title7", time: "16:50", content: "Paragraph 7" },
        // { name: "user8", title: "Title8", time: "17:50", content: "Paragraph 8" },
        // { name: "user9", title: "Title9", time: "18:50", content: "Paragraph 9" },
    ]
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        setPostText(e.target.value);
    
        // Adjust height based on content
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      };
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <header className={styles.headerContainer}>
                    <input className={styles.inputsearch} placeholder="Search...." />
                    <div className={styles.headerActions}>
                        <button className={styles.usersToggleBtn} onClick={toggleUsersSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
                                <path d={userIcon} />
                            </svg>
                        </button>
                        <div className={styles.notificationIcon}>
                            <Image src={notification} alt="Notification" width="30" />
                        </div>
                        <button className={styles.createPostButton}>Create post</button>
                    </div>
                </header>
                

                <main className={styles.mainContent}>
                <div className={styles.contents}>
                     <div className={styles["add-posts"]}>
                        <div className={styles["post-header"]}>
                            <img src="/profile.png" alt="User" className={styles["profile-pic"]} />
                             <textarea
                            ref={textareaRef}
                            placeholder="Share something..."
                            //   value={postText}
                            onChange={handleChange}
                            className={styles["post-input"]}
                            rows="1"
                            />
                            <span className={styles.emoji}>😊</span>
                        </div>
                        <div className={styles["post-actions"]}>
                            <button><img src="/image-icon.png" alt="Image" /> Image</button>
                            <button><img src="/video-icon.png" alt="Video" /> Video</button>
                            <button><img src="/poll-icon.png" alt="Poll" /> Poll</button>
                            <button className={styles.privacy}>Public ▼</button>
                        </div>
                        </div>
                        <div className={styles.feedContainer}>
                            {posts.map((post) => (
                                <article className={styles.postCard} key={post.title}>
                                    <div className={styles.postHeader}>
                                        <div className={styles.authorInfo}>
                                            <div className={styles.authorAvatar}>
                                                <Image src={image} alt="Profile" />
                                            </div>
                                            <span className={styles.authorName}>{post.name}</span>
                                        </div>
                                        <span className={styles.postTimestamp}>{post.time}</span>
                                    </div>

                                    <h2 className={styles.postTitle}>{post.title}</h2>

                                    <div className={styles.postContent}>
                                        <p>{post.content}</p>
                                    </div>

                                    <div className={styles.postActions}>
                                        <button className={styles.actionButton}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25">
                                                <path d={like} />
                                            </svg>
                                        </button>
                                        <button className={styles.actionButton}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25">
                                                <path d={dislike} />
                                            </svg>
                                        </button>
                                        <button className={styles.actionButton}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25">
                                                <path d={comment} />
                                            </svg>
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                </div>
                <div className={`${styles.userssidebar} ${showUsersSidebar ? styles.active : ''}`}>
                    <div className={styles.sidebarheader}>
                        all users
                    </div>
                    {users.map((user, index) => {
                        const statusClass = user.status === "Online" ? styles.Online : styles.Offline;
                        return (
                            <ul key={index} className={styles.userslist}>
                                <li className={styles.useritem}>
                                    <div className={styles.useravatar}>
                                        <Image src={image} alt={user.name} />
                                        <span className={statusClass}></span>
                                    </div>
                                    <span className={styles.username}>{user.name}</span>
                                </li>
                            </ul>
                        );
                    })}
                </div>
                </main>
            </div>
        </div>
    )
}