import React from "react";
import PropTypes from "prop-types";
import styles from "./IngridientDetails.module.css";
import ingridientPropTypes from "../../utils/types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function IngridientDetails(props) {
  const { id } = useParams();
  const ingredient = useSelector((state) =>
    state.ingridients.ingridients.find((item) => item._id === id)
  );

  const modalState = useSelector((state) => state.ingredientDetails.openIngridientModal);
  console.log(modalState);

  return (
    <div className={styles.details}>
      <p className={styles.title}>Детали ингридиента</p>
      {ingredient !== undefined && <img src={ingredient.image} alt="" />}
      {ingredient !== undefined && <p>{ingredient.name}</p>}
      <div className={styles.nutritionals}>
        <div className="mr-5">
          <p>Калории,ккал</p>
          {ingredient !== undefined && <p>{ingredient.calories}</p>}
        </div>
        <div className="mr-5">
          <p>Белки, г</p>
          {ingredient !== undefined && <p>{ingredient.proteins}</p>}
        </div>
        <div className="mr-5">
          <p>Жиры, г</p>
          {ingredient !== undefined && <p>{ingredient.fat}</p>}
        </div>
        <div className="mr-5">
          <p>Углеводы, г</p>
          {ingredient !== undefined && <p>{ingredient.carbohydrates}</p>}
        </div>
      </div>
    </div>
  );
}

IngridientDetails.propTypes = ingridientPropTypes;
