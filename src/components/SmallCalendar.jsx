import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/SmallCalendar.module.css";
import dayjs from "dayjs";
import { getMonth } from "../util";
import GlobalContext from "../context/GlobalContext";

function SmallCalendar() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState(getMonth());

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    const { monthIndex, setSmallCalendarMonth ,setDaySelected,daySelected} = useContext(GlobalContext);
    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);

    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1);
    }

    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1);
    }

    function getDayClass(day) {
        const format="DD-MM-YY";
        const nowDay= dayjs().format(format);
        const currDay=day.format(format);
        /* const today = dayjs().startOf('day'); 
        const currentDay = day.startOf('day'); */ 
        const slcDay= daySelected && daySelected.format(format)

        if (nowDay===currDay) {
            return { backgroundColor: "blue", color: "white" }; 
        }else if(currDay===slcDay){
           return {backgroundColor: "#ccc", color:"333"}
        }
         else {
            return {}; 
        }
    }

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <p>
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
                </p>
                <div>
                <button className={styles.arrowbtn} onClick={handlePrevMonth}>
                    &lt;
                </button>
                <button className={styles.arrowbtn} onClick={handleNextMonth}>
                    &gt;
                </button>
                </div>
            </header>
            <div className={styles.gridContainer}>
                {currentMonth[0].map((day, i) => (
                    <span key={i} className={styles.day}>{day.format("dd").charAt(0)}</span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button key={idx} style={getDayClass(day)} className={styles.dates} onClick={()=>{
                                setSmallCalendarMonth(currentMonthIdx);
                                setDaySelected(day);

                            }}>
                                <span>{day.format('D')}</span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default SmallCalendar;
