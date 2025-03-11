"use client"; 
import ProfileSide from '../../../components/profileSide.js';
import HomeFeed from '../../../components/homeFeed.js';
import ActivitySide from '../../../components/activitySide.js'; 
import '../home/globals.css';

export default  function Home() { 
      
     return (
    <div>

      <main className="main-content">
      <ProfileSide />
      <HomeFeed />
      <ActivitySide />
      </main>

    </div>
  );
}