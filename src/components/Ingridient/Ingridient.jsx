import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Ingridient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientPropTypes from "../../utils/types";
import { useDrag } from "react-dnd/dist/hooks";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { OPEN_INGREDIENT_MODAL } from "../../services/actions/ingredientDetailsAction";

export default function Ingridient(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ingridient, setIngridient] = useState({});
  const idsArr = useSelector((state) => state.orderDetails.orderIds);
  const [count, setCount] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    // 1. Выводит булевое значение переносится элемент или нет 2.ref
    item: { id: props.id, type: props.ingridient.type },
    type: "drop_ingr",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Выводит булевое значение переносится элемент или нет
    }),
  });

  React.useEffect(() => {
    setIngridient(props.ingridient);
  }, [props.ingridient]);

  const handlerModalOpen = () => {
    dispatch({ type: OPEN_INGREDIENT_MODAL });
    history.push(`ingredients/${ingridient._id}`);
  };

  useEffect(() => {
    const coincidences = idsArr.filter((i) => i === props.id);
    setCount(coincidences.length);
  }, [idsArr]);

  return (
    <div className={styles.ingridient} onClick={handlerModalOpen}>
      {count > 0 && <Counter count={count} />}
      <img src={ingridient.image} ref={drag} />
      <div className={`${styles.priceWrapper} pt-1`}>
        <p className={styles.price}>{ingridient.price}</p>
        <CurrencyIcon></CurrencyIcon>
      </div>
      <p className={`${styles.ingridientName} pt-1`}>{ingridient.name}</p>
    </div>
  );
}

Ingridient.propTypes = {
  ingridient: PropTypes.shape(ingridientPropTypes),
};
