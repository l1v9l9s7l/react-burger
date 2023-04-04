import OrderDetailedStatus from "../../components/OrderDetailedStatus/OrderDetailedStatus";

import styles from "./Order.module.css";

const Order = () => {
  return (
    <div className={styles.OrderPage}>
      <OrderDetailedStatus />
    </div>
  );
};

export default Order;
