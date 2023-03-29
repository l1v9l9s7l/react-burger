import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import OrderDetailedStatus from "../../components/order-detailed-status/order-detailed-status";
import {
  WS_CREATED_ORDERS_CONNECTION_CLOSED,
  WS_CREATED_ORDERS_CONNECTION_START,
} from "../../services/actions/createdOrders";
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from "../../services/actions/feed";

import styles from "./order.module.css";

const Order = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START });
    dispatch({ type: WS_CREATED_ORDERS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
      dispatch({ type: WS_CREATED_ORDERS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <div className={styles.OrderPage}>
      <OrderDetailedStatus />
    </div>
  );
};

export default Order;
