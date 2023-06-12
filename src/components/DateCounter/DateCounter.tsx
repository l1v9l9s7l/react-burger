import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DateCounter.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingridient from "../Ingridient/Ingridient";
import Modal from "../Modal/Modal";
import IngridientDetails from "../IngridientDetails/IngridientDetails";

export default function DateCounter({ createdAt } : any)  {
  const date = new Date(createdAt);
  return (
    <div>
      <p className={styles.dateCount}>
        Сегодня, {date.getHours()}:{date.getMinutes()} i-GMT+3
      </p>
    </div>
  );
}
