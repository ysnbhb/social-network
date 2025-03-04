import GroupsFeed from "../../../components/groupsFeed.js";
import GroupsInv from "../../../components/groupsInv.js";
import GroupsSide from "../../../components/groupsSide.js";
import '../../../styles/groups.css';

export default function Groups() {
  return (
    <div>
       <main className="main-content">
       <GroupsSide />
       <GroupsFeed />
       <GroupsInv />
       </main>
    </div>
  );
}