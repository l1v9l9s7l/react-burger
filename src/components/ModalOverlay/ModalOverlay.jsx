import React from "react";
import styles from './ModalOverlay.module.css'
import PropTypes from 'prop-types'

export default function ModalOverlay(props) {

  return (
    <div className={styles.modalOverlay} onClick={props.onClose} />
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
}
