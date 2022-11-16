import styles from './OrderDetails.module.css'

export default function OrderDetails() {
  return (
    <div className={styles.orderDetails}>
      <p className={styles.orderNumber}>112423</p>
      <p className={styles.orderTitle}>Идентификатор заказа</p>
      <img className={styles.orderImage} src="../../images/done.png" alt="" />
      <p className={styles.orderStatus}>Ваш заказ начали готовить</p>
      <p className={styles.orderWait}>Дождитесь готовности на орбитальной станции</p>
    </div>

  )
}