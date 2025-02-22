import Image from "next/image";
import style from "./profile.module.css";
import image from "../../component/images/IMG-20240514-WA0002.jpg";
import bag from "../../component/images/pxfuel.jpg";
export default function Profile() {
  const people = [
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
        <div className={style["card-profile-posts"]}>
          
          <div className={style["avatar-user"]}>
            <Image
              src={bag}
              alt=""
              srcset=""
              className={style.avatarContainer}
              objectFit="cover"
            />
          </div>
          <div className={style.buttonContainer}>
              <button className={style.followButton}>Follow</button>
              <button className={style.moreButton}>Send Message</button>
            </div>
          <span className={style["Circle-image"]}>
            <Image
              src={image}
              className={`${style["avatarContainer-profile"]} ${style.avatarContainer}`}
              srcset=""
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
            />
          </span>
          <div className={style["user"]}>
            <div className={style.content}>
              <div className={style.about}>
                <h1 className={style.name}>Rharbi Omar</h1>
                <p className={style.jobTitle}>
                  Passionate programmer & problem solver 🔹 Student at Zone 01
                  Oujda – Peer-to-peer learning & innovation 🔹 Always exploring
                  new technologies
                </p>
              </div>
              <div className={style.stats}>
                <span className={style.statText}>
                  <span className={style.statNumber}>6,476</span> followers
                </span>
                <span className={style.statText}>
                  <span className={style.statNumber}>500+</span> following
                </span>
              </div>
          </div>
           
          </div>
         
        </div>

        <div className={style["card-posts"]}>
          <div className={style["post-header"]}>
            <div className={style["user-info"]}>
            <Image
                src={image}
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
              Just finished an amazing project with my team! 🚀 Really proud of
              what we've accomplished together. #TeamWork #Innovation #TechLife
            </p>
            <Image
              src={bag}
              alt=""
              srcset=""
              className={style.avatarContainer}
              objectFit="cover"
            />
          </div>

          <div className={style["post-actions"]}>
            <button className={style["action-button"]}>👍 Like <span>123 likes</span></button>
            <button className={style["action-button"]}>💬 Comment  <span>45 comments</span></button>
            <button className={style["action-button"]}>↗️ Share</button>
          </div>
 
        </div>
        <div className={style["card-posts"]}>
          <div className={style["post-header"]}>
            <div className={style["user-info"]}>
              <Image
                src={image}
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
              Just finished an amazing project with my team! 🚀 Really proud of
              what we've accomplished together. #TeamWork #Innovation #TechLife
            </p>
            <Image
              src={bag}
              alt=""
              srcset=""
              className={style.avatarContainer}
              objectFit="cover"
            />
          </div>

          <div className={style["post-actions"]}>
            <button className={style["action-button"]}>👍 Like <span>123 likes</span></button>
            <button className={style["action-button"]}>💬 Comment  <span>45 comments</span></button>
            <button className={style["action-button"]}>↗️ Share</button>
          </div>

           
        </div>
      </div>
      <div className={style["card-users"]}>
        <div className={style.card}>
          <h3 className={style.title}>People also viewed</h3>
          <ul className={style.list}>
            {people.map((person, index) => (
              <li key={index} className={style.item}>
                 <Image
                src={image}
                alt="User avatar"
                className={style["post-avatar"]}
              />
                <div className={style.info}>
                  <h4 className={style.name}>{person.name}</h4>
                  <p className={style.role}>{person.role}</p>
                </div>
                <button className={style.followButton}>Follow</button>
              </li>
            ))}
          </ul>
          <a href="#" className={style.showMore}>
            Show more
          </a>
        </div>
      </div>
    </div>
  );
}
