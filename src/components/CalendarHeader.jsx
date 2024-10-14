import React, { useContext } from "react";
import styles from "../styles/CalendarHeader.module.css";
import logo from "../assets/logo.jpg";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleReset() {
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
  }

  return (
    <div className={styles.main}>
      <img src={logo} alt="logo" className={styles.logo} />
      <h1>Calendar</h1>
      <button className={styles.btn} onClick={handleReset}>
        Today
      </button>
      <div className={styles.change}>
        <button className={styles.arrowbtn} onClick={handlePrevMonth}>
          &lt;
        </button>
        <button className={styles.arrowbtn} onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <h2>
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </div>
  );
}

export default CalendarHeader;
