"use client";
import { useContext } from 'react';
import { Context } from '../../../lib/Context.js';
import ProfileSide from '../../../components/profileSide.js';
import HomeFeed from '../../../components/homeFeed.js';
import ActivitySide from '../../../components/activitySide.js'; 
import '../home/globals.css';

export default  function Home() { 
    const { dataProfile } = useContext(Context);
     return (
    <div>
      {/* Use Navbar as a JSX element */}
      {/* Other content for the home page */}
      <main className="main-content">
      <ProfileSide classes={{dataProfile}} />
      <HomeFeed  />
      <ActivitySide 
          classes={{ title: "followers",fullname:"Omar Rharbi",time:"30m",button:"Follow" }}
          />
      </main>

    </div>
  );
}