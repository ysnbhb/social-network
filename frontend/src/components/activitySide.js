import '../styles/activitySidebar.css';

export default function ActivitySidebar({ className ,classes = {} } ) {
  return (
    <aside className={`${className} activity-sidebar`}>
      <div className="activity-header">
        <h3>{`${classes.title}`}</h3>
        <a href="#" className="text-muted">See all</a>
      </div>

      <div className="activity-item">
        <div className={`${classes.image} avatar`}></div>
        <div>
          <p><strong>{`${classes.fullname}`}</strong> </p>
          <p className="text-muted"> {`${classes.time}`}</p>
        </div>
        <button>{`${classes.button}`}</button>
      </div>

      <div className="activity-item">
        <div className={`${classes.image} avatar`}></div>
        <div>
          <p><strong>{`${classes.fullname}`}</strong></p>
          <p className="text-muted"> {`${classes.time}`}</p>
        </div>
        <button>{`${classes.button}`}</button>
      </div>
      <div className="activity-item">
        <div className={`${classes.image} avatar`}></div>
        <div>
          <p><strong>{`${classes.fullname}`}</strong> </p>
          <p className="text-muted"> {`${classes.time}`}</p>
        </div>
        <button>{`${classes.button}`}</button>
      </div>
    </aside>
  );
};
