import Image from 'next/image';
import '../styles/activitySidebar.css';
import image from "../components/images/IMG-20240514-WA0002.jpg";
 export default function ActivitySidebar({ className ,classes = [],title  } ) {
  let array=[]
  if(Array.isArray(classes)) {
    classes.map((item) => array.push(item))
    
 } 
  return (
    <aside className={`${className} activity-sidebar`}>
      <div className="activity-header">
        <h3>{`${title}`}</h3>
      </div>
      {array.map((item, index) => (
        <div key={index} className="activity-item">
          <Image src={image} className="avatar" alt="Avatar" />
          <div>
            <p><strong>{item.fullname }</strong></p>
            <p className="text-muted">{item.time || "N/A"}</p>
          </div>
          <button>{item.button  }</button>
        </div>
      ))}
    
    </aside>
  );
};
