"use client"

import styles from "./page.module.css"
import notification from "../../component/notification.svg"
import image from "../../component/user.jpg"
import Image from 'next/image';

const dislike = "M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z"
const like = "M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"
const comment = "M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"



export default function Home() {
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
        { name: "user4", title: "Title4", time: "13:50", content: "Paragraph 4" },
        { name: "user5", title: "Title5", time: "14:50", content: "Paragraph 5" },
        { name: "user6", title: "Title6", time: "15:50", content: "Paragraph 6" },
        { name: "user7", title: "Title7", time: "16:50", content: "Paragraph 7" },
        { name: "user8", title: "Title8", time: "17:50", content: "Paragraph 8" },
        { name: "user9", title: "Title9", time: "18:50", content: "Paragraph 9" },
    ]
    return (

        <div className={styles.mainpage}>
            {/* <div className={styles.usersection}>

                <p>groups</p>
                <p>profile</p>
                <button>
                    <Image src={logout} width="30" />
                </button>
            </div> */}
            <div className={styles.page}>
                <header>
                    <h1>My page title</h1>
                    <Image src={notification} alt="Notification" width="30" />
                    <button>create post</button>
                </header>
                <div className={styles.main}>
                    <div className={styles.posts}>
                        {posts.map((post) => (
                            <div className={styles.post} key={post.title}>  {/* Add a unique key to each post */}
                                <div className={styles.postDetails}>
                                    <div className={styles.postHeader}>
                                        <div className={styles.imgprofilepost}>
                                            <Image src={image} alt="Profile" />
                                            <h2>{post.name}</h2>
                                        </div>
                                        <h2>{post.title}</h2>
                                        <p className={styles.creationPost}>{post.time}</p>
                                    </div>
                                    <div className={styles.postcontent}>
                                        <p>{post.content}</p>
                                    </div>
                                    <div className={styles.postIcons}>
                                        <p><svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px"><path d={like} /></svg></p>
                                        <p><svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px"><path d={dislike} /></svg></p>
                                        <p><svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px"><path d={comment} /></svg></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.allusers}>
                        <p>all users</p>
                        {users.map((user, index) => {
                            const statusClass = user.status === "Online" ? styles.Online : styles.Offline; // Set the correct class dynamically
                            return (
                                <div key={index} className={styles.user}>
                                    <div className={styles.imgUser}>
                                        <Image src={image} alt={user.name} />
                                        <span className={statusClass}></span>
                                    </div>
                                    <div className={styles.userStatus}>
                                        <p>{user.name}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

        </div>
    )
}