"use client";

import { formatDate } from "@/lib/formatDate";
import "../styles/groupEvents.css";

import { use, useEffect, useState } from "react";

export function Event({ id }) {
  const [showPopup, setShowPopup] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    groupId: +id,
  });
  const [events, setEvents] = useState([]);
  const handleSubmit = async (e) => {
    const res = await fetch("/api/group/create/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Event created successfully");
      setShowPopup(false);
      console.log("Event created successfully");
    } else {
      alert(data);
      console.log("Error creating event:", data);
    }
    console.log("Event Data:", eventData);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`/api/group/events?groupId=${id}`);
      const data = await res.json();
      if (res.ok) {
        setEvents(data);
      } else {
        console.log("Error fetching events:", data);
      }
    };
    fetchEvents();
  }, [id]);

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
          {events.map((event) => (
            <EventCart event={event} key={event.id} />
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
                onChange={(e) =>
                  setEventData({ ...eventData, title: e.target.value })
                }
                value={eventData.title}
              />

              <label htmlFor="event-description">Description</label>
              <textarea
                id="event-description"
                placeholder="Event Description"
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
                value={eventData.description}
                required
              ></textarea>

              <label htmlFor="event-datetime">Day/Time *</label>
              <input
                type="datetime-local"
                id="event-datetime"
                required
                onChange={(e) =>
                  setEventData({ ...eventData, date: e.target.value })
                }
                value={eventData.date}
              />

              <div className="popup-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-create"
                  onClick={handleSubmit}
                >
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

function EventCart({event}) {
  const { id ,title, description, date, groupId , creator_user , status } = event;
  return (
    <div className="event-card">
      <div className="event-header">
        <h3 className="event-title">{title}</h3>
        <p className="event-date">📅 {formatDate(date)}</p>
      </div>
      <p className="event-description">
        {description}
      </p>
      <div className="event-footer">
        <p className="event-meta">Hosted by: {creator_user}</p>
        <div className="event-actions">
          {status=="" ? (
            <>
            <button className="accept-btn">Going</button>
            <button className="cancel-btn">Not Going</button>
            </>
          ) : (
            <button className="cancel-btn">Not Going</button>
          )}
          
        </div>
      </div>
    </div>
  );
}
