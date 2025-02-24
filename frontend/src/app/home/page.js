import Navbar from '../../components/navbar.js';
import ProfileSide from '../../components/profileSide.js';
import HomeFeed from '../../components/homeFeed.js';
import ActivitySide from '../../components/activitySide.js';
// import profileSide from '../../components/profileSide.js'; // Correct the import statement to match your file structure

import '../home/globals.css';


export default function Home() {
  return (
    <div>
      <Navbar /> {/* Use Navbar as a JSX element */}
      {/* Other content for the home page */}

      <main className="main-content">
      <ProfileSide />
      <HomeFeed />
      <ActivitySide />
      </main>

    </div>
  );
}