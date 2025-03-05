"use client";

import { useState } from 'react';
import '../../../../styles/groupEvents.css';

export default function GroupEvents() {
  const [showPopup, setShowPopup] = useState(false);

  // Toggle popup visibility
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div>
      {/* Event Form Section */}
      <div className="event-form">
        <div className="event-creator">
          <div className="event-header">
            <div className="event-title">Create a New Event</div>
            <button className="event-btn" onClick={togglePopup}>
              + Event Group
            </button>
          </div>
        </div>

        <div className="events-feed">
          {/* Event Cards */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="event-card">
              <div className="event-header">
                <h3 className="event-title">JavaScript Workshop</h3>
                <p className="event-date">📅 March 15, 2025 - 2:00 PM</p>
              </div>
              <p className="event-description">
                A hands-on workshop to improve JavaScript skills.
              </p>
              <div className="event-footer">
                <p className="event-meta">Hosted by: Jane Smith</p>
                <div className="event-actions">
                  <button className="accept-btn">Going</button>
                  <button className="cancel-btn">Not Going</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2 className="popup-title">Create New Event</h2>
              <button className="popup-close" onClick={togglePopup}>
                &times;
              </button>
            </div>
            <div className="popup-form">
              <label htmlFor="event-title">Title *</label>
              <input
                type="text"
                id="event-title"
                placeholder="Event Title"
                required
              />

              <label htmlFor="event-description">Description</label>
              <textarea
                id="event-description"
                placeholder="Event Description (Optional)"
              ></textarea>

              <label htmlFor="event-datetime">Day/Time *</label>
              <input
                type="datetime-local"
                id="event-datetime"
                required
              />

              <div className="popup-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-create">
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
