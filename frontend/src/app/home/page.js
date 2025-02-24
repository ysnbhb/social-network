import ProfileSide from '../../components/profileSide.js';
import HomeFeed from '../../components/homeFeed.js';
import ActivitySide from '../../components/activitySide.js';
// import profileSide from '../../components/profileSide.js'; // Correct the import statement to match your file structure

export default function Home() {
  return (
    

      <main className="main-content">
      <ProfileSide />
      <HomeFeed />
      <ActivitySide />
      </main>

    
  );
}