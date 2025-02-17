"use client"

import Head from "next/head"
import styles from "./page.module.css"
import notification from "./notification.svg"
import image from "./favicon.ico"
import Image from 'next/image'; //?????


export default function Home() {
    const users = [
        { name: "pedram zamani", status: "Offline" },
        { name: "reza kiani", status: "Online" },
        { name: "ehsan badri", status: "Offline" },
        { name: "alex shiro", status: "Offline" },
    ]
    return (
        <div className={styles.page}>
            <header>
                <h1>My page title</h1>
                {/* add svg */}
                <img src={notification} alt="Notification" />
                <button>create post</button>
            </header>
            <div className={styles.main}>
                <div className={styles.usersection}>
                    <p>groups</p>
                    <p>profile</p>
                    <p>logout</p>
                </div>
                <div className={styles.posts}>
                    <div className={styles.postcontent}>
                        <div className={styles.imgprofilepost}>
                        <Image src={image} alt="Profile"/>
                        </div>
                        <div className={styles.postDetails} >
                            <div className={styles.postHeader}>
                                <h2>Name</h2>
                                <p>Title Post</p>
                                <p className={styles.creationPost} > 10:50 </p>
                            </div>
                            <p>content</p>
                            <div className={styles.postIcons}>
                                <p>like icon</p>
                                <p>dislike icon</p>
                                <p>comment icon</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.postcontent}>
                        <div className={styles.imgprofilepost}>
                        <Image src={image} alt="Profile"  />
                        </div>
                        <div className={styles.postDetails} >
                            <div className={styles.postHeader}>
                                <h2>Name2</h2>
                                <p>Title Post2</p>
                                <p className={styles.creationPost} > 10:50 </p>
                            </div>
                            <p>content2</p>
                            <div className={styles.postIcons}>
                                <p>like icon</p>
                                <p>dislike icon</p>
                                <p>comment icon</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.allusers}>
                    <p>all users</p>
                    {users.map((user, index) => (
                    <div key={index} className={styles.user}>
                        <div className={styles.imgUser}>
                            <Image src={image}  alt={user.name} />
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
