// src/components/Event.jsx
import React from "react";
import PropTypes from "prop-types";

const Event = ({ event }) => {
  return (
    <div
      style={{
        backgroundColor: event.color || "#3174ad",
        color: "#fff",
        padding: "4px 6px",
        borderRadius: "4px",
        fontSize: "12px",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <strong>{event.title}</strong>
      {event.place && <span style={{ fontSize: "11px" }}>{event.place}</span>}
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    place: PropTypes.string,
  }).isRequired,
};

export default Event;
