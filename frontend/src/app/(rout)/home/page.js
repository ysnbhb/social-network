"use client"; 
import ProfileSide from '../../../components/profileSide.js';
import HomeFeed from '../../../components/homeFeed.js';
import ActivitySide from '../../../components/activitySide.js'; 
import '../home/globals.css';
import { useState } from 'react';

export default  function Home() { 
      const [user, setUser] = useState([]);
     return (
    <div>

      <main className="main-content">
      <ProfileSide setUser={setUser} />
      <HomeFeed dadfollow={user}/>
      <ActivitySide />
      </main>

    </div>
  );
}