
import Link from 'next/link';
import '../styles/profileSidebar.css';
import Loading from './loading';

export default function ProfileSide({  classes   }) {
//   if (classes && classes.dataProfile !== undefined) {
//     console.log(classes.dataProfile, "inside profile");
// } else {
//     console.log("No profile data available");
// }
  
    return (
      <div className="profile-page">
      {classes?.dataProfile ? (
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="avatar">
              {/* Add Avatar Image here */}
            </div>
            <h2>{classes.dataProfile.firstName} {classes.dataProfile.lastName}</h2>
            <p className="text-muted">@{classes.dataProfile.nickName
            }</p>
          </div>
          <div className="profile-stats">
            <div>
              <h3>{classes.dataProfile.posts_count}</h3>
              <p className="text-muted">Post</p>
            </div>
            <div>
              <h3>{classes.dataProfile.follower_count}</h3>
              <p className="text-muted">Followers</p>
            </div>
            <div>
              <h3>{classes.dataProfile.following_count}</h3>
              <p className="text-muted">Following</p>
            </div>
          </div>
          <Link href={`profile/${classes.dataProfile.id}`}  className="profile-button">My Profile</Link>
        </aside>
        ): (

          <div>
          <Loading></Loading>

          </div>
)}
      </div>
      
    );
  }
  