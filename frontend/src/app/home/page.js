"use client"

import Head from "next/head"
import styles from "./page.module.css"
import notification from "../../component/notification.svg"
import image from "../../component/favicon.ico"
import Image from 'next/image'; //?????
import like from "../../component/like.png"
import dislike from "../../component/dislike.png"


export default function Home() {
    const users = [
        { name: "user1", status: "Offline" },
        { name: "user2", status: "Online" },
        { name: "user3", status: "Offline" },
        { name: "user4", status: "online" },
    ]
    const posts = [
        { name: "user1", title: "Title1", time: "10:50", content: "Paragraph 1" },
        { name: "user2", title: "Title2", time: "11:50", content: "Paragraph 2" },
        { name: "user3", title: "Title3", time: "12:50", content: "Paragraph 3" },
    ]
    return (
        <div className={styles.page}>
            <header>
                <h1>My page title</h1>
                <Image src={notification} alt="Notification" width="30" />
                <button>create post</button>
            </header>
            <div className={styles.main}>
                <div className={styles.usersection}>
                    <p>groups</p>
                    <p>profile</p>
                    <p>logout</p>
                </div>
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <div className={styles.post} key={post.title}>  {/* Add a unique key to each post */}
                            <div className={styles.imgprofilepost}>
                                <Image src={image} alt="Profile" />
                            </div>
                            <div className={styles.postDetails}>
                                <div className={styles.postHeader}>
                                    <h2>{post.name}</h2>
                                    <p>{post.title}</p>
                                    <p className={styles.creationPost}>{post.time}</p>
                                </div>
                                <div className={styles.postcontent}>
                                    <p>{post.content}</p>
                                </div>
                                <div className={styles.postIcons}>
                                    <Image src={like} alt="Like" width="30" height="30" />
                                    <Image src={dislike} alt="Dislike" width="30" height="30" />
                                    <p>comment icon</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.allusers}>
                    <p>all users</p>
                    {users.map((user, index) => (
                        <div key={index} className={styles.user}>
                            <div className={styles.imgUser}>
                                <Image src={image} alt={user.name} />
                                <span className={`${user.status === "Online" ? "Online" : "Offline"}`}></span>
                            </div>
                            <div className={styles.userStatus} >
                                <p >{user.name}</p>
                                <p className="text">{user.name} is {user.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}