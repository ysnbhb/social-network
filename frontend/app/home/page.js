"use client"

import Head from "next/head"
import styles from "./page.module.css"
import notification from "./notification.svg"
import image from "./favicon.ico"

export default function Home() {
    return (
        <div className={styles.page}>
            <header>
                <h1>My page title</h1>
                <button>create post</button>
                {/* add svg */}
                <img src={notification} alt="Notification" />
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
                            <img src={image} alt="img"></img>
                        </div>
                        <div>
                            <div>
                                <p>name</p>
                                <p>title post</p>
                                <p>time of creation </p>
                            </div>
                            <p>content</p>
                            <div>
                                <p>like icon</p>
                                <p>dislike icon</p>
                                <p>comment icon</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.allusers}>
                    <p>all users</p>
                </div>
            </div>
        </div>
    )
}
