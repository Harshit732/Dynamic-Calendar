import React from 'react';
import Day from './Day';
import styles from "../styles/Month.module.css";

function Month({ month }) {
    console.log(month)
  return (
    
    <div className={styles.main}>
      {month.map((row, i) => (
        <div className={styles.row} key={i}>
          {row.map((day, idx) => (
            <Day day={day} rowIdx={i} key={idx} className={styles.day} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Month;
