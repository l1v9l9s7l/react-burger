import React from "react";
import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import DateCounter from "../DateCounter/DateCounter";

import styles from "./OrderCard.module.css";
import OrderStatus from "../OrderStatus/OrderStatus";
import { useSelector } from "../../hooks/hooks";

import { fillDetailedInformationOrder } from "../../utils/utils";
import IngredientImage from "../IngredientImage/IngredientImage";

const OrderCard = ({ order, onClick, showStatus = false } : {order:{number: number,name: string, status: string, ingredients: [], createdAt: string, _id: string}, onClick: Function, showStatus?: boolean}) => {
  const descriptionIngr = useSelector((state) => state.ingridients.ingridients);

  const { number, name, status, ingredients, createdAt } = order;

  const detailedInfo = fillDetailedInformationOrder(ingredients, descriptionIngr);

  const date = new Date(createdAt);

  const handleClick = () => {
    onClick(order._id);
  };

  return (
    <div className={styles.OrderCard} onClick={handleClick}>
      <div className={styles.Header}>
        <span className="text text_type_digits-default pb-6">#{number}</span>
        <DateCounter createdAt={createdAt} />
      </div>
      <span className={`text text_type_main-medium`}>{name}</span>
      {showStatus && <OrderStatus status={status} />}
      <div className={styles.Footer}>
        {Object.keys(detailedInfo.ingredients).map((key, index) => {
          const item = detailedInfo.ingredients[key];
          const zIndex = Object.keys(detailedInfo.ingredients).length - index;
          const right = index !== 0 ? 16 * index : 0;
          const mix = { zIndex: `${zIndex}`, right: `${right}px` };

          return (
            <IngredientImage
              key={key}
              image={item.image}
              count={item.count > 1 && item.type !== "bun" ? item.count : undefined}
              mix={mix}
              name={item.name}
            />
          );
        })}
        <div className={styles.Price}>
          <span className="text text_type_digits-default pr-2">{detailedInfo.price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  showStatus: PropTypes.bool,
};

export default OrderCard;
