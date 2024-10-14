import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Day.module.css";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

function Day({ day, rowIdx }) {
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const [dayEvents, setDayEvents] = useState([]);
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? styles.today
      : "";
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}

        <p className={`${styles.content} ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </div>
      <div
        style={{ cursor: "pointer" }}
        className={styles.eventremgrid}
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            style={{ backgroundColor: `${evt.label}` }}
            className={styles.eventRem}
            key={idx}
            onClick={() => {
              setSelectedEvent(evt);
            }}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day;
