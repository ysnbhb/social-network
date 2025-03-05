import '../../../../styles/groupEvents.css';

export default function groupEvents() {
  return (
    <div>
        <div className="event-form">
        <div className="event-creator">
          <div className="event-header">
            <div className="event-title">Create a New Event</div>
            <button className="event-btn">+ Event Group</button>
          </div>
        </div>

        <div class="events-feed">
            <div class="event-card">
                <div class="event-header">
                    <h3 class="event-title">Tech Meetup</h3>
                    <p class="event-date">📅 March 10, 2025 - 5:00 PM</p>
                </div>
                <p class="event-description">A gathering for tech enthusiasts to network and learn.</p>
                <div class="event-footer">
                    <p class="event-meta">Hosted by: John Doe</p>
                    <div class="event-actions">
                        <button class="accept-btn">Going</button>
                        <button class="cancel-btn">Not Going</button>
                    </div>
                </div>
            </div>

            <div class="event-card">
                <div class="event-header">
                    <h3 class="event-title">JavaScript Workshop</h3>
                    <p class="event-date">📅 March 15, 2025 - 2:00 PM</p>
                </div>
                <p class="event-description">A hands-on workshop to improve JavaScript skills.</p>
                <div class="event-footer">
                    <p class="event-meta">Hosted by: Jane Smith</p>
                    <div class="event-actions">
                        <button class="accept-btn">Going</button>
                        <button class="cancel-btn">Not Going</button>
                    </div>
                </div>
            </div>

            <div class="event-card">
                <div class="event-header">
                    <h3 class="event-title">JavaScript Workshop</h3>
                    <p class="event-date">📅 March 15, 2025 - 2:00 PM</p>
                </div>
                <p class="event-description">A hands-on workshop to improve JavaScript skills.</p>
                <div class="event-footer">
                    <p class="event-meta">Hosted by: Jane Smith</p>
                    <div class="event-actions">
                        <button class="accept-btn">Going</button>
                        <button class="cancel-btn">Not Going</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

</div>
  );
}