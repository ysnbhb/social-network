import Image from "next/image";
import style from "./profile.module.css";
import image from "../../component/images/IMG-20240514-WA0002.jpg";
import bag from "../../component/images/pxfuel.jpg";
import imagePosts from "../../component/images/pexels-vladbagacian-1368382.jpg";
import chat from "./icons/chat.svg";
import ActivitySidebar from "../../components/activitySide";
import HomeFeed from "../../components/homeFeed";
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
              className={`${style["bground"]} ${style.avatarContainer}`} 
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
         <HomeFeed  className={`${style.Homefeed}`  }/>
{/* 
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
              Just finished an amazing project with my team! 🚀 Really proud of what we've accomplished together. #TeamWork #Innovation #TechLife


              Just finished an amazing project with my team! 🚀 Really proud of what we've accomplished together. #TeamWork #Innovation #TechLife


              Just finished an amazing project with my team! 🚀 Really proud of what we've accomplished together. #TeamWork #Innovation #TechLife


              Just finished an amazing project with my team! 🚀 Really proud of what we've accomplished together. #TeamWork #Innovation #TechLife


            </p>
            <Image
              src={imagePosts}
              alt=""
              srcset=""
              className={style.avatarContainer}
              objectFit="cover"
            />
          </div>

          <div className={style["post-actions"]}>
            <button className={style["action-button"]}>
              <svg  className={style["icons"]}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                id="Like"
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="256.005"
                    x2="256.005"
                    y1="30"
                    y2="438.078"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0"
                      stop-color="#ff0000"
                      // stop-color="#777777"
                      class="stopColor00efd1 svgShape"
                    />
                    <stop
                      offset="1"
                      stop-color="#ff0000"
                      // stop-color="#757575"
                      class="stopColor00acea svgShape"
                    />
                  </linearGradient>
                </defs>
                <g fill="#000000" class="color000000 svgShape">
                  <path
                    fill="url(#a)"
                    d="M345.263,86.067A116.191,116.191,0,0,0,256.116,127.2c-21.447-25.98-53.907-41.132-89.369-41.132A116.543,116.543,0,0,0,50.337,202.479c0,46.987,34.146,98.842,101.489,154.127a728.3,728.3,0,0,0,99.355,68.131,10,10,0,0,0,9.6.026,714.046,714.046,0,0,0,99.386-67.635c67.354-55.061,101.505-107.092,101.505-154.649A116.929,116.929,0,0,0,345.263,86.067Zm2.476,255.39c-38.895,31.829-78.291,55.328-91.7,63.025-13.406-7.779-52.824-31.535-91.742-63.517C86.637,277.149,70.337,230.432,70.337,202.479a96.52,96.52,0,0,1,96.41-96.412c33.52,0,63.723,16.16,80.793,43.3A9.9,9.9,0,0,0,255.923,154h.082a9.961,9.961,0,0,0,8.377-4.5,96.681,96.681,0,0,1,177.291,52.97C441.673,230.806,425.376,277.922,347.739,341.457Z"
                  />
                </g>
              </svg>
              <span>123 likes</span>
            </button>
            <button className={style["action-button"]}>
              <Image src={chat} alt="User avatar" className={style["icons"]} />

              <span>45</span>
            </button>
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
            <button className={style["action-button"]}>
              <svg className={style["icons"]}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                id="Like"
                
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="256.005"
                    x2="256.005"
                    y1="30"
                    y2="438.078"
                    gradientUnits="userSpaceOnUse"
                    fill="red"
                  >
                    <stop
                      offset="0"
                      stop-color="#777777"
                      class="stopColor00efd1 svgShape"
                    />
                    <stop
                      offset="1"
                      stop-color="#757575"
                      class="stopColor00acea svgShape"
                    />
                  </linearGradient>
                </defs>
                <g fill="#000000" class="color000000 svgShape">
                  <path
                    fill="url(#a)"
                    d="M345.263,86.067A116.191,116.191,0,0,0,256.116,127.2c-21.447-25.98-53.907-41.132-89.369-41.132A116.543,116.543,0,0,0,50.337,202.479c0,46.987,34.146,98.842,101.489,154.127a728.3,728.3,0,0,0,99.355,68.131,10,10,0,0,0,9.6.026,714.046,714.046,0,0,0,99.386-67.635c67.354-55.061,101.505-107.092,101.505-154.649A116.929,116.929,0,0,0,345.263,86.067Zm2.476,255.39c-38.895,31.829-78.291,55.328-91.7,63.025-13.406-7.779-52.824-31.535-91.742-63.517C86.637,277.149,70.337,230.432,70.337,202.479a96.52,96.52,0,0,1,96.41-96.412c33.52,0,63.723,16.16,80.793,43.3A9.9,9.9,0,0,0,255.923,154h.082a9.961,9.961,0,0,0,8.377-4.5,96.681,96.681,0,0,1,177.291,52.97C441.673,230.806,425.376,277.922,347.739,341.457Z"
                  />
                </g>
              </svg>
              <span>123 likes</span>
            </button>
            <button className={style["action-button"]}>
              {" "}
              <Image
                src={chat}
                alt="User avatar"
                className={style["icons"]}
              />{" "}
              <span>45 comments</span>
            </button>
          </div>
        </div> */}
      </div>

      <div className={style["card-users"]}>
         <ActivitySidebar />
        
      </div>
    </div>
  );
}
