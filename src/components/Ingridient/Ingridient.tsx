import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Ingridient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientPropTypes from "../../utils/types";
import { useDrag } from "react-dnd/dist/hooks";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { useHistory } from "react-router-dom";
import { OPEN_INGREDIENT_MODAL } from "../../services/actions/ingredientDetailsAction";

export default function Ingridient(props: {id: number | string, ingridient: {type: string, _id: string}  }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ingridient, setIngridient] = useState<{_id?: string, image?: string, price?: number, name?: string}>({});
  const idsArr = useSelector((state) => state.orderDetails.orderIds);
  const [count, setCount] = useState<number>(0);

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
        <CurrencyIcon type="primary"></CurrencyIcon>
      </div>
      <p className={`${styles.ingridientName} pt-1`}>{ingridient.name}</p>
    </div>
  );
}
