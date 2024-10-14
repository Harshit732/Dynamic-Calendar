import React, { useContext, useState } from "react";
import styles from "../styles/EventModal.module.css";
import GlobalContext from "../context/GlobalContext";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineSchedule } from "react-icons/md";
import { MdOutlineSegment } from "react-icons/md";
import { MdLabel } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";

const labelsClass = ["indigo", "gray", "green", "blue", "red", "purple"];

function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedlabel, setSelectedlabel] = useState(
    selectedEvent
      ? labelsClass.find((lbl) => lbl === selectedEvent.label)
      : labelsClass[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedlabel,
      day: daySelected.valueOf(),
      id: selectedEvent? selectedEvent.id : Date.now(),
    };
    
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className={styles.main}>
      <form className={styles.formcontainer}>
        <header className={styles.header}>
          <span className={styles.icon}>=</span>
          <div>
            {selectedEvent &&
             (<span 
                onClick={()=> {
                  dispatchCalEvent({type: "delete", payload: selectedEvent});
                  setShowEventModal(false);
                }}
               className={styles.icon}><MdDeleteForever/></span>)}
           
              <span onClick={() => setShowEventModal(false)} className={styles.icon}><RxCross2 /></span>
            
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.gridconatiner}>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={styles.input1}
            />
           <div style={{display:"flex", alignItems: "center", marginTop: "1rem"}}>
           <span style={{ color: "gray", margin: "0 1rem", fontSize:"1.5rem"  }}>
            <MdOutlineSchedule />
            </span>
            <p style={{fontSize:"1.5rem"}}>{daySelected.format("dddd, MMMM DD")}</p>
           </div>
           <div style={{display:"flex", alignItems: "center", marginTop: "1rem"}}>
           <span style={{ color: "gray", margin: "0 1rem", fontSize:"1.5rem"  }}>
            <MdOutlineSegment />
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={styles.input2}
            />

           </div>
           <div style={{display:"flex", alignItems: "center", marginTop: "1rem"}}>
           <span style={{ color: "gray", margin: "0 1rem", fontSize:"1.5rem" }}>
            <MdLabel />
            </span>
            <div className={styles.label}>
              {labelsClass.map((lblClass, i) => (
                <span
                  key={i}
                  style={{ backgroundColor: `${lblClass}` }}
                  className={styles.labelcolor}
                  onClick={() => setSelectedlabel(lblClass)}
                >
                  {selectedlabel === lblClass && (
                    <span style={{ color: "white", fontSize: "2rem" , textAlign:"center", alignItems:"center", marginTop: "2px" }}>
                      <IoIosCheckmark />
                    </span>
                  )}
                </span>
              ))}
            </div>
           </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
