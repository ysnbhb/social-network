import Navbar from '../../components/navbar.js';
import GroupsFeed from '../../components/groupsFeed.js';

export default function Home() {
  return (
    <div>
      <Navbar /> {/* Use Navbar as a JSX element */}
      {/* Other content for the home page */}

      <GroupsFeed />

    </div>
  );
}