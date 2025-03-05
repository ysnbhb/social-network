
import Link from 'next/link';
import '../styles/profileSidebar.css';
  import userProfile from '@/app/hooks/userProfile';
import HandleIduser from './postComp';
 
export default function ProfileSide({  classes   }) {
  const [profile, error] = userProfile();
  const {

  avatarUrl,
  firstName,
  follower_count,
  following_count,
  lastName,
  nickName,
  posts_count, 
  } = profile;
  const  handleIduser=()=>{
    sessionStorage.setItem('selectedUserProfile', JSON.stringify(profile.id));
    route.push('/profile');

  }
    return (
      <div className="profile-page">
      {   profile? (
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div  >
            {avatarUrl && (
          <img
            src={`${avatarUrl}`}
            alt="Post"
            style={{ width: "65px", height: "65px", borderRadius:"50%" }}
          />
        )}
            </div>
            <h2>{firstName} {lastName}</h2>
            <p className="text-muted">@{nickName
            }</p>
          </div>
          <div className="profile-stats">
            <div>
              <h3>{posts_count}</h3>
              <p className="text-muted">Post</p>
            </div>
            <div>
              <h3>{follower_count}</h3>
              <p className="text-muted">Followers</p>
            </div>
            <div>
              <h3>{following_count}</h3>
              <p className="text-muted">Following</p>
            </div>
          </div>
          <Link href={`profile`}  onClick={handleIduser}   className="profile-button">My Profile</Link>
        </aside>
        ) : (
          <div className="error-message">
          <p>{error.message || "An unexpected error occurred."}</p>
        </div>
    )}
      </div>
      
    );
  }
  