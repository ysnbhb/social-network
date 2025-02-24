import '../styles/profileSidebar.css';

export default function ProfileSide() {
    return (
      <div className="profile-page">
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="avatar">
              {/* Add Avatar Image here */}
            </div>
            <h2>Soufian Aljaoui</h2>
            <p className="text-muted">@Saljaoui</p>
          </div>
          <div className="profile-stats">
            <div>
              <h3>250</h3>
              <p className="text-muted">Post</p>
            </div>
            <div>
              <h3>2022</h3>
              <p className="text-muted">Followers</p>
            </div>
            <div>
              <h3>590</h3>
              <p className="text-muted">Following</p>
            </div>
          </div>
          <button className="profile-button">My Profile</button>
        </aside>
      </div>
    );
  }
  