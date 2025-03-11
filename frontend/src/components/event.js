"use client";

import { formatDate } from "@/lib/formatDate";
import "../styles/groupEvents.css";

import { use, useEffect, useState } from "react";
import { API_URL } from "./api";

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
    const res = await fetch(`${API_URL}/api/group/create/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(eventData),
    });
    const data = await res.json();
    if (res.ok) {
      // alert("Event created successfully");
      setShowPopup(false);
      setEventData({
        title: "",
        description: "",
        date: "",
        groupId: +id,
      });
      setEvents([data, ...events]);
    } else {
      alert(data);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`${API_URL}/api/group/events?groupId=${id}` ,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
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
        {events.length === 0 && (
    <div className="no-data" >
      <h1>There are no events</h1>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    </div>
  )}
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

function EventCart({ event }) {
  const { id, title, description, date, groupId, creator_user, status } = event;
  const [respo, setRespo] = useState(status);
  const RespoForEvent = async (status = "Going") => {
    const res = await fetch(`${API_URL}/api/group/event/response`, {
      method: "POST",
      body: JSON.stringify({
        eventId: id,
        status,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setRespo(data.status);
      console.log("Response added successfully");
    } else {
      alert(data);
      console.log("Error adding response:", data);
    }
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <h3 className="event-title">{title}</h3>
        <p className="event-date">📅 {formatDate(date)}</p>
      </div>
      <p className="event-description">{description}</p>
      <div className="event-footer">
        <p className="event-meta">Hosted by: {creator_user}</p>
        <div className="event-actions">
          {respo == "" ? (
            <>
              <button
                className="accept-btn"
                onClick={() => {
                  RespoForEvent("Going");
                }}
              >
                Going
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  RespoForEvent("Not Going");
                }}
              >
                Not Going
              </button>
            </>
          ) : respo == "Going" ? (
            <div className="accept-btn" style={{
              background: "#4ecb4e",
              color: "white",
            }}>Going</div>
          ) : (
            <div className="cancel-btn" style={{
              background: "#f30000bd",
              color: "white",
            }}>Not Going</div>
          )}
        </div>
      </div>
    </div>
  );
}
