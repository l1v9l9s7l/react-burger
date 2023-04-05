import OrderDetailedStatus from "../../components/OrderDetailedStatus/OrderDetailedStatus";

import styles from "./Order.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { WS_FEED_CONNECTION_START } from "../../services/actions/feed";
import { WS_FEED_CONNECTION_CLOSED } from "../../services/actions/feed";

const Order = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START });
    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    };
  }, [dispatch]);
  return (
    <div className={styles.OrderPage}>
      <OrderDetailedStatus />
    </div>
  );
};

export default Order;
