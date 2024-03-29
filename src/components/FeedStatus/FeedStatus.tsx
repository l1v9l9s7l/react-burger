import React from "react";
import PropTypes from "prop-types";
import { splitChunks } from "../../utils/utils";
import OrderStatus from "../OrderStatus/OrderStatus";

import styles from "./FeedStatus.module.css";

const ORDER_DONE = "done";
const ORDER_IN_PROGRESS = "pending";

const FeedStatus = ({ orders, total, totalToday } : {orders: {number: number,name: string, status: string, ingredients: [], createdAt: string, _id: string}[], total: number, totalToday: number}) => {
  const createOrderDashboard = (title: string, filterStatus: string) => {
    const ordersChunks = splitChunks(
      orders.filter((order: {status: string}) => order.status === filterStatus),
      5,
      2
    );
    return (
      <div className={styles.StatusDashboard}>
        <h2 className={`text text_type_main-medium ${styles.FeedTitle}`}>{title}:</h2>
        {ordersChunks.map((chunk, index) => {
          return (
            <div key={`${chunk}_${index}`} className={styles.ColumnOrderNumbers}>
              {chunk.map((order: {number: number,name: string, status: string, ingredients: [], createdAt: string, _id: string}) => (
                <OrderStatus
                  key={order._id}
                  status={order.status}
                  number={order.number}
                  mix={styles.OrderNumber}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.FeedStatus}>
      <div className={styles.Dashboard}>
        {createOrderDashboard("Готовы", ORDER_DONE)}
        {createOrderDashboard("В работе", ORDER_IN_PROGRESS)}
      </div>
      <h2 className={`text text_type_main-medium ${styles.FeedTitle}`}>Выполнено за все время:</h2>
      <p className="text text_type_digits-large pb-15">{total}</p>
      <h2 className={`text text_type_main-medium ${styles.FeedTitle}`}>Выполнено за сегодня:</h2>
      <p className="text text_type_digits-large">{totalToday}</p>
    </div>
  );
};

FeedStatus.propTypes = {
  orders: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  totalToday: PropTypes.number.isRequired,
};

export default FeedStatus;
