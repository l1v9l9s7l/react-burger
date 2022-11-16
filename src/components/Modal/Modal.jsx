import React from "react";
import PropTypes from 'prop-types'
import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'


export default function Modal(props) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div className={`${styles.modalCloseIcon} pt-15 pr-10`} onClick={() => { props.setActive(false) }}>
          <CloseIcon />
        </div>
        {props.details}
      </div>
    </div>
  )
}

Modal.propTypes = {
  setActive: PropTypes.any.isRequired
}