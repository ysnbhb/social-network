"use client";

export default function GroupsInv() {
    return (
        <div className="groupInvitations">
        <div className="header">
          <h2>Group Invitations</h2>
        </div>
        <div className="invitationsList">
          <div className="invitation-item">
            <div className="invitation-info">
              <div className="invitation-title">Frontend Developer</div>
              <div className="invitation-members">28 members</div>
            </div>
            <div className="invitation-actions">
              <button className="accept-btn">Accept</button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
          <div className="invitation-item">
            <div className="invitation-info">
              <div className="invitation-title">Python Enthusiasts</div>
              <div className="invitation-members">42 members</div>
            </div>
            <div className="invitation-actions">
              <button className="accept-btn">Accept</button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
          <div className="invitation-item">
            <div className="invitation-info">
              <div className="invitation-title">DevOps Community</div>
              <div className="invitation-members">19 members</div>
            </div>
            <div className="invitation-actions">
              <button className="accept-btn">Accept</button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
          <div className="invitation-item">
            <div className="invitation-info">
              <div className="invitation-title">AI Research</div>
              <div className="invitation-members">34 members</div>
            </div>
            <div className="invitation-actions">
              <button className="accept-btn">Accept</button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
}
