import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import IngredientImage from "../IngredientImage/IngredientImage";
import { fillDetailedInformationOrder } from "../../utils/utils";
import DateCounter from "../DateCounter/DateCounter";
import OrderStatus from "../OrderStatus/OrderStatus";

import styles from "./OrderDetailedStatus.module.css";

const OrderDetailedStatus = () => {
  const { id } = useParams();
  const isFeedRoute = useRouteMatch("/feed/:id");
  const isProfileRoute = useRouteMatch("/profile/orders/:id");
  let order = {};

  const feeds = useSelector((state) => state.feed.orders);

  const feedOrder = useSelector(
    (state) => state.feed.orders.find((order) => order._id === id) || {}
  );

  const profileOrder = useSelector(
    (state) => state.createdOrders.orders.find((order) => order._id === id) || {}
  );

  if (isFeedRoute) {
    order = feedOrder;
  } else if (isProfileRoute) {
    order = profileOrder;
  }

  const { number, name, status, ingredients, createdAt } = order;
  const descriptionIngr = useSelector((state) => state.ingridients.ingridients);
  const detailedInfo = fillDetailedInformationOrder(ingredients, descriptionIngr);

  return (
    <>
      <div className={styles.OrderDetailedStatus}>
        <p className={`text text_type_digits-default pb-10 ${styles.Number}`}>#{number}</p>
        <p className="text text_type_main-medium pb-3">{name}</p>
        {status && <OrderStatus status={status} mix="pb-15" />}
        <p className="text text_type_main-medium pb-6">Состав:</p>
        <div className={styles.IngrdientList}>
          {Object.keys(detailedInfo.ingredients).map((key) => {
            const { image, name, price, count } = detailedInfo.ingredients[key];
            return (
              <div key={key} className={styles.IngredientListItem}>
                <IngredientImage image={image} name={name} />
                <p className={`text text_type_main-small ${styles.Name}`}>{name}</p>
                <p className="text text_type_main-medium">
                  {count} x {price} <CurrencyIcon />
                </p>
              </div>
            );
          })}
        </div>
        <div className={styles.Footer}>
          <DateCounter createdAt={createdAt} />
          <p className="text text_type_main-medium">
            {detailedInfo.price} <CurrencyIcon />
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderDetailedStatus;
