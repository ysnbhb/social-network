import '../styles/activitySidebar.css';

export default function ActivitySidebar() {
  return (
    <aside className="activity-sidebar">
      <div className="activity-header">
        <h3>Activity</h3>
        <a href="#" className="text-muted">See all</a>
      </div>

      <div className="activity-item">
        <div className="avatar"></div>
        <div>
          <p><strong>Deraa</strong> started following you</p>
          <p className="text-muted">30m</p>
        </div>
        <button>Follow</button>
      </div>

      <div className="activity-item">
        <div className="avatar"></div>                
        <div>
          <p><strong>Edlwp</strong> liked your photo</p>
          <p className="text-muted">1d</p>
        </div>
      </div>

      <div className="activity-item">
        <div className="avatar"></div>          
        <div>
          <p><strong>Edlwp</strong> liked your photo</p>
          <p className="text-muted">1d</p>
        </div>
      </div>
    </aside>
  );
};
