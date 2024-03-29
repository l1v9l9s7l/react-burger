import styles from "./OrderDetails.module.css";
import PropTypes from "prop-types";
import doneImagePath from "../../images/done.png";

export default function OrderDetails(props: {orderId: string}) {
  return (
    <div className={`${styles.orderDetails} `}>
      {!props.orderId && (
        <p className={`${styles.orderTitle} pt-8 pb-15`}>Номер заказа загружается ...</p>
      )}
      <p className={`${styles.orderNumber} pt-30`}>{props.orderId}</p>
      <p className={`${styles.orderTitle} pt-8 pb-15`}>идентификатор заказа</p>
      <img className={styles.orderImage} src={doneImagePath} alt="Готово" />
      <p className={`${styles.orderStatus} pt-15 pb-2`}>Ваш заказ начали готовить</p>
      <p className={`${styles.orderWait} pb-30`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}


