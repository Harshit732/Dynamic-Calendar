import React, { useState, useEffect } from 'react';
import styles from "../styles/DynamicCalendar.module.css";
// Importing CSS Module

const DynamicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(() => {
    // Load events from local storage if available
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const handleEventChange = (event) => {
    if (selectedDate) {
      const key = selectedDate.toDateString();
      setEvents({
        ...events,
        [key]: event.target.value,
      });
    }
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    // Add blank spaces before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div className={styles.emptyDay} key={`empty-${i}`}></div>);
    }

    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month;
      const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

      days.push(
        <div
          key={day}
          className={`${styles.calendarDay} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button onClick={handlePrevMonth}>Previous</button>
        <h2>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className={styles.calendarGrid}>
        {daysOfWeek.map((day, index) => (
          <div key={index} className={styles.calendarWeekday}>
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
      {selectedDate && (
        <div className={styles.eventSection}>
          <h3>Event for {selectedDate.toDateString()}</h3>
          <textarea
            value={events[selectedDate.toDateString()] || ''}
            onChange={handleEventChange}
            placeholder="Add your event here"
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default DynamicCalendar;
