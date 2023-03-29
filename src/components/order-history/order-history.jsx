import React, { useCallback, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_CREATED_ORDERS_CONNECTION_CLOSED,
  WS_CREATED_ORDERS_CONNECTION_START,
} from "../../services/actions/createdOrders";
import OrderCard from "../order-card/order-card";

import styles from "./order-history.module.css";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const orders = useSelector((store) => store.createdOrders.orders);

  useEffect(() => {
    dispatch({ type: WS_CREATED_ORDERS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CREATED_ORDERS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const redirectModalUrl = useCallback(
    (id) => {
      history.push({ pathname: `/profile/orders/${id}` }, { profileOrderStatusModal: location });
    },
    [history, location]
  );

  const handleOpenModal = (id) => {
    redirectModalUrl(id);
  };

  return (
    <div className={styles.OrderHistory}>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} onClick={handleOpenModal} showStatus={true} />
      ))}
    </div>
  );
};

export default OrderHistory;
