import Image from 'next/image';
import '../styles/activitySidebar.css';
import image from "../components/images/IMG-20240514-WA0002.jpg";
 export default function ActivitySidebar({ className ,classes = []  } ) {
  return (
    <aside className={`${className} activity-sidebar`}>
      <div className="activity-header">
        <h3>{`${classes.title}`}</h3>
        <a href="#" className="text-muted">See all</a>
      </div>
      {classes.map((item, index) => (
        <div key={index} className="activity-item">
          <Image src={item.image || "/default-avatar.png"} className="avatar" alt="Avatar" />
          <div>
            <p><strong>{item.fullname || "Unknown User"}</strong></p>
            <p className="text-muted">{item.time || "N/A"}</p>
          </div>
          <button>{item.button || "Follow"}</button>
        </div>
      ))}
    
    </aside>
  );
};
