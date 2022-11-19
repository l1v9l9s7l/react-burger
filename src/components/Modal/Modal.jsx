import React, { useMemo, useState } from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById('modal')

export default function Modal({ onModalClose, details }) {

  return ReactDOM.createPortal(
    <>
      <div>
        <div className={styles.overlay} onClick={onModalClose}>
          <ModalOverlay />
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalWrapper}>
            <div className={`${styles.modalCloseIcon} pt-15 pr-10`} onClick={onModalClose} >
              <CloseIcon />
            </div>
            {details}
          </div>
        </div>
      </div >
    </>
    , modalRoot
  )
}
