import React, { useEffect, useMemo } from "react";
import styles from './ModalOverlay.module.css'
import Modal from "../Modal/Modal";

export default function ModalOverlay({ active, setActive, details }) {

  React.useEffect(() => {
    const closeOnEsc = (evt) => {
      evt.code === 'Escape' && setActive(false);
    };
    document.addEventListener('keydown', closeOnEsc);

    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    }
  }, []);

  return (
    <div className={active ? styles.modalOverlayActive : styles.modalOverlay} onClick={() => { setActive(false) }}>
      <div onClick={e => e.stopPropagation()}>
        <Modal details={details} setActive={setActive} />
      </div>
    </div >
  )
}
