"use client";

export default function GroupsInv() {
    return (
        <div class="groupInvitations">
        <div class="header">
          <h2>Group Invitations</h2>
        </div>
        <div class="invitationsList">
          <div class="invitation-item">
            <div class="invitation-info">
              <div class="invitation-title">Frontend Developer</div>
              <div class="invitation-members">28 members</div>
            </div>
            <div class="invitation-actions">
              <button class="accept-btn">Accept</button>
              <button class="cancel-btn">Cancel</button>
            </div>
          </div>
          <div class="invitation-item">
            <div class="invitation-info">
              <div class="invitation-title">Python Enthusiasts</div>
              <div class="invitation-members">42 members</div>
            </div>
            <div class="invitation-actions">
              <button class="accept-btn">Accept</button>
              <button class="cancel-btn">Cancel</button>
            </div>
          </div>
          <div class="invitation-item">
            <div class="invitation-info">
              <div class="invitation-title">DevOps Community</div>
              <div class="invitation-members">19 members</div>
            </div>
            <div class="invitation-actions">
              <button class="accept-btn">Accept</button>
              <button class="cancel-btn">Cancel</button>
            </div>
          </div>
          <div class="invitation-item">
            <div class="invitation-info">
              <div class="invitation-title">AI Research</div>
              <div class="invitation-members">34 members</div>
            </div>
            <div class="invitation-actions">
              <button class="accept-btn">Accept</button>
              <button class="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
}
