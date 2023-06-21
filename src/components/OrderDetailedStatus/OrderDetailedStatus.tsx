import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { useParams, useRouteMatch } from "react-router-dom";
import IngredientImage from "../IngredientImage/IngredientImage";
import { fillDetailedInformationOrder } from "../../utils/utils";
import DateCounter from "../DateCounter/DateCounter";
import OrderStatus from "../OrderStatus/OrderStatus";
import { useEffect, useState } from "react";

import styles from "./OrderDetailedStatus.module.css";

const OrderDetailedStatus = () => {
  const dispatch = useDispatch();
  const { id }: {id: string} = useParams();
  const isFeedRoute = useRouteMatch("/feed/:id");
  const isProfileRoute = useRouteMatch("/profile/orders/:id");
  let order: {number?: number,name?: string, status?: string, ingredients: number[], createdAt: string, _id?: string} = {createdAt: '', ingredients: []};
  const [feedsState, setFeedsState] = useState<{find: Function}>();
  const [updatedFeedOrder, setUpdatedFeedOrder] = useState();

  const feeds = useSelector((state) => state.feed.orders);

  useEffect(() => {
    setFeedsState(feeds);
  }, []);

  useEffect(() => {
    if (feeds) {
      if (feedsState) {
        setUpdatedFeedOrder(feedsState.find((order: {_id: string}) => order._id === id));
      }
    }
  }, [feeds]);

  const feedOrder = useSelector(
    (state) => state.feed.orders.find((order) => order._id === id) || {createdAt: '', ingredients: [1]}
  );

  const profileOrder = useSelector(
    (state) => state.createdOrders.orders.find((order) => order._id === id) || {createdAt: '', ingredients: [1]}
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
                  {count} x {price} <CurrencyIcon type="primary"/>
                </p>
              </div>
            );
          })}
        </div>
        <div className={styles.Footer}>
          <DateCounter createdAt={createdAt} />
          <p className="text text_type_main-medium">
            {detailedInfo.price} <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderDetailedStatus;
