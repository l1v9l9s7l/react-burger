import React from "react";
import PropTypes from 'prop-types'
import styles from './IngridientDetails.module.css'
import ingridientPropTypes from "../../utils/types";

export default function IngridientDetails(props) {
  return (
    <div className={styles.details}>
      <p className={styles.title}>Детали ингридиента</p>
      <img src={props.image} alt="" />
      <p>{props.name}</p>
      <div className={styles.nutritionals}>
        <div className="mr-5">
          <p >Калории,ккал</p>
          <p>{props.calories}</p>
        </div>
        <div className="mr-5">
          <p >Белки, г</p>
          <p>{props.proteins}</p>
        </div>
        <div className="mr-5">
          <p >Жиры, г</p>
          <p>{props.fat}</p>
        </div>
        <div className="mr-5">
          <p >Углеводы, г</p>
          <p>{props.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

IngridientDetails.propTypes = ingridientPropTypes