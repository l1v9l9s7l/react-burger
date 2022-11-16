import React from "react";
import styles from './ModalOverlay.module.css'
import Modal from "../Modal/Modal";

export default function ModalOverlay({ active, setActive, details }) {
  return (
    <div className={active ? styles.modalOverlayActive : styles.modalOverlay} onClick={() => { setActive(false) }}>
      <div onClick={e => e.stopPropagation()}>
        <Modal details={details} />
      </div>
    </div >
  )
}
