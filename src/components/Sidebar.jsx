import React , {useContext} from 'react'
import styles from "../styles/Sidebar.module.css";
import SmallCalendar from './SmallCalendar';
import GlobalContext from '../context/GlobalContext';
import Labels from './Labels';


function Sidebar() {
    const{setShowEventModal}=useContext(GlobalContext)
  return (
    <aside className={styles.main}>
        <button onClick={()=>setShowEventModal(true)} className={styles.createEvent}>
            <span>Create</span>
        </button>
        <SmallCalendar/>
        <Labels/>

    </aside>
  )
}

export default Sidebar