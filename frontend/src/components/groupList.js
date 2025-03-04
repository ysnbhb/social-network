import "../styles/groupsFeed.css";
import Link from "next/link";

export default function GroupList({ group }) {
  const { id, title, totalMembers } = group;
  return (
    <>
      <div className="group-item">
        <div className="group-info">
          <div className="group-title">{title}</div>
          <div className="group-members">{totalMembers} members</div>
        </div>
        <Link className="open-group-btn" href={`/groups/${id}`} style={{
            textDecoration: "none",
        }}>
          Open
        </Link>
      </div>
    </>
  );
}
