import React, { useContext, useState } from "react";
import styles from "../styles/EventModal.module.css";
import GlobalContext from "../context/GlobalContext";

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
               className={styles.icon}>del</span>)}
            <button onClick={() => setShowEventModal(false)}>
              <span className={styles.icon}>X</span>
            </button>
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
            <span style={{ color: "gray", margin: "1rem" }}>
              schedule {/* icon */}
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span style={{ color: "gray", margin: "1rem" }}>
              segmnet {/* icon */}
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
            <span style={{ color: "gray", margin: "1rem" }}>
              lable {/* icon */}
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
                    <span style={{ color: "white", fontSize: "1rem" }}>
                      ! {/* checkicon */}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
