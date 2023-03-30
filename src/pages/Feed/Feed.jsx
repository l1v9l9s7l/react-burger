import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import FeedStatus from "../../components/FeedStatus/FeedStatus";
import OrderCard from "../../components/OrderCard/OrderCard";
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from "../../services/actions/feed";

import styles from "./Feed.module.css";

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { orders, total, totalToday } = useSelector((store) => store.feed);

  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START });
    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const redirectModalUrl = useCallback(
    (id) => {
      history.push({ pathname: `/feed/${id}` }, { feedOrderStatusModal: location });
    },
    [history, location]
  );

  const handleClick = (id) => {
    dispatch({ type: "OPEN_INGREDIENT_MODAL" });
    redirectModalUrl(id);
  };

  return (
    <div className={styles.FeedPage}>
      <h1 className={`text text_type_main-large pb-5 ${styles.Title}`}>Лента заказов</h1>
      <div className={styles.Feed}>
        <div className={styles.Orders}>
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} onClick={handleClick} />
          ))}
        </div>
        <FeedStatus orders={orders} total={total} totalToday={totalToday} />
      </div>
    </div>
  );
};

export default Feed;
