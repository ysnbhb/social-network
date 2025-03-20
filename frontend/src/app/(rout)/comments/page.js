"use client"; 
import ProfileSide from '../../../components/profileSide.js';
import Comments from '../../../components/comments.js';
import ActivitySide from '../../../components/activitySide.js'; 
import { use } from 'react';
// import '../components/globals.css';

export default  function Home({searchParams}) { 
      const {target_id} = use(searchParams);
     return (
    <div>
      {/* Use Navbar as a JSX element */}
      {/* Other content for the home page */}
      <main className="main-content">
      <ProfileSide  />
      <Comments  id={target_id} />
      <ActivitySide 
           />
      </main>

    </div>
  );
}