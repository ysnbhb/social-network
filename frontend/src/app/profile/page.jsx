import style from "./profile.module.css";
export default function Profile() {
    const people = [
        {
            name: "Amanda Reyes",
            role: "Marketing Manager at Alibaba Group",
            avatar: "/avatars/avatar1.png",
        },
        {
            name: "Han Ryujin",
            role: "CTO at Google",
            avatar: "/avatars/avatar2.png",
        },
        {
            name: "Paul Arriola",
            role: "Lead Engineer at Tesla",
            avatar: "/avatars/avatar3.png",
        },
        {
            name: "Tafari Sans",
            role: "Principal Designer at Spotify",
            avatar: "/avatars/avatar4.png",
        },
        {
            name: "Velasco Timmber",
            role: "Sr. Product Designer at Netflix",
            avatar: "/avatars/avatar5.png",
        },
        {
            name: "Han Soo Hee",
            role: "Actor, Public Figure",
            avatar: "/avatars/avatar6.png",
        },
        {
            name: "Salsabilla Aslley",
            role: "Content Creator",
            avatar: "/avatars/avatar7.png",
        },
    ];
    return (
        <div className={style.container}>
            <div className={style["card-profile"]}>
                <div className={style["card-profile-posts"]}></div>
                 <div className={style["card-posts"]}>
            <div className={style["post-header"]}>
                <div className={style["user-info"]}>
                    <img 
                        src="/api/placeholder/40/40" 
                        alt="User avatar" 
                        className={style["post-avatar"]} 
                    />
                    <div className={style["user-details"]}>
                        <h4 className={style["user-name"]}>John Doe</h4>
                        <p className={style["post-time"]}>2 hours ago</p>
                    </div>
                </div>
                <button className={style["more-options"]}>•••</button>
            </div>
            
            <div className={style["post-content"]}>
                <p className={style["post-text"]}>
                    Just finished an amazing project with my team! 🚀 
                    Really proud of what we've accomplished together. 
                    #TeamWork #Innovation #TechLife
                </p>
                <img 
                    src="/api/placeholder/500/300" 
                    alt="Post image" 
                    className={style["post-image"]} 
                />
            </div>
            
            <div className={style["post-actions"]}>
                <button className={style["action-button"]}>
                    👍 Like
                </button>
                <button className={style["action-button"]}>
                    💬 Comment
                </button>
                <button className={style["action-button"]}>
                    ↗️ Share
                </button>
            </div>
            
            <div className={style["post-stats"]}>
                <span>123 likes</span>
                <span>•</span>
                <span>45 comments</span>
            </div>
        </div>
                <div className={style["card-posts"]}></div>
                <div className={style["card-posts"]}></div>
                <div className={style["card-posts"]}></div>
            </div>
            <div className={style["card-users"]}>
                <div className={style.card}>
                    <h3 className={style.title}>People also viewed</h3>
                    <ul className={style.list}>
                        {people.map((person, index) => (
                            <li key={index} className={style.item}>
                                <img src={person.avatar} alt={person.name} className={style.avatar} />
                                <div className={style.info}>
                                    <h4 className={style.name}>{person.name}</h4>
                                    <p className={style.role}>{person.role}</p>
                                </div>
                                <button className={style.addButton}>+</button>
                            </li>
                        ))}
                    </ul>
                    <a href="#" className={style.showMore}>
                        Show more
                    </a>
                </div>
            </div>
        </div>
    )
}