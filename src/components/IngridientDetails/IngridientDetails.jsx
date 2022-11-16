import React from "react";
import PropTypes from 'prop-types'
import styles from './IngridientDetails.module.css'

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

IngridientDetails.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
}