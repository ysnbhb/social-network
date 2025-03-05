"use client"; 
import ProfileSide from '../../../components/profileSide.js';
import HomeFeed from '../../../components/homeFeed.js';
import ActivitySide from '../../../components/activitySide.js'; 
import '../home/globals.css';

export default  function Home() { 
      
     return (
    <div>
      {/* Use Navbar as a JSX element */}
      {/* Other content for the home page */}
      <main className="main-content">
      <ProfileSide  />
      <HomeFeed  />
      <ActivitySide 
           />
      </main>

    </div>
  );
}