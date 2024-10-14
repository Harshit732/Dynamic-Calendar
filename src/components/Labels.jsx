import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import styles from "../styles/Labels.module.css";

function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  // State to track the title for each label based on index
  const [labelTitles, setLabelTitles] = useState({});

  const handleTitleChange = (index, value) => {
    setLabelTitles((prevTitles) => ({
      ...prevTitles,
      [index]: value, // Update the title for the specific label (by index)
    }));
  };

  return (
    <>
      <div>
      <p className={styles.header}>Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className={styles.labels}>
          <input
            type="checkbox"
            checked={checked}
            className={styles.checkbox}
            style={{ accentColor: lbl }}
            onChange={() => {
              updateLabel({ label: lbl, checked: !checked });
            }}
          />
          <span
            style={{
              color: "gray",
              marginLeft: "0.5rem",
              textTransform: "capitalize",
              margin: "0"
            }}
          >
            <input
              type="text"
              name="title"
              placeholder={lbl} 
              value={labelTitles[idx] || ""} 
              onChange={(e) => handleTitleChange(idx, e.target.value)}
              required
              className={styles.input1}
            />
          </span>
        </label>
      ))}
      </div>
    </>
  );
}

export default Labels;
