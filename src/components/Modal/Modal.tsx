import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("modal") || document.createElement("react-modals");

export default function Modal(props: any) {
  React.useEffect(() => {
    const closeOnEsc = (evt: any) => {
      evt.code === "Escape" && props.onModalClose();
    };
    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={props.onModalClose} />
      <div className={styles.modalContent}>
        <div className={styles.modalWrapper}>
          <div className={`${styles.modalCloseIcon} pt-15 pr-10`} onClick={props.onModalClose}>
            <CloseIcon type="primary" />
          </div>
          {props.children}
        </div>
      </div>
    </>,
    modalRoot
  );
}

// Modal.propTypes = {
//   children: PropTypes.object,
//   onModalClose: PropTypes.func,
// };
