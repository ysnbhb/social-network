"use client";

export default function GroupsSide() {
    return (
        <div className="myGroupsSide">
        <div className="header">
          <h2>My Groups</h2>
        </div>
        <div className="groupsList">
          <div className="group-item">
          <div className="group-info">
              <div className="group-title">Web</div>
              <div className="group-members">12 members</div>
            </div>
            <button className="open-group-btn">Open</button>
          </div>
          
          <div className="group-item">
          <div className="group-info">
              <div className="group-title">Data Science</div>
              <div className="group-members">8 members</div>
            </div>
            <button className="open-group-btn">Open</button>
          </div>
          
          <div className="group-item">
            <div className="group-info">
              <div className="group-title">UI/UX Design</div>
              <div className="group-members">15 members</div>
            </div>
            <button className="open-group-btn">Open</button>
          </div>

          <div className="group-item">
            <div className="group-info">
              <div className="group-title">UI/UX Design</div>
              <div className="group-members">15 members</div>
            </div>
            <button className="open-group-btn">Open</button>
          </div>
          
          <div className="group-item">
            <div className="group-info">
              <div className="group-title">Machine Lea</div>
              <div className="group-members">10 members</div>
            </div>
            <button className="open-group-btn">Open</button>
          </div>
        </div>
      </div>
    )
}
