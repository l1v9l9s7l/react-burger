import React, { useState } from 'react'
import styles from './Ingridient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import IngridientDetails from '../IngridientDetails/IngridientDetails.jsx'



export default function Ingridient(props) {

  const [modalActive, modalSetActive] = useState(false)
  return (
    <>
      <div className={styles.ingridient} onClick={() => modalSetActive(true)}>
        <img src={props.image} />
        <div className='pt-1'></div>
        <div className={styles.priceWrapper}>
          <p className={styles.price}>{props.price}</p>
          <CurrencyIcon></CurrencyIcon>
        </div>
        <div className='pt-1'></div>
        <p className={styles.ingridientName}>{props.name}</p>
      </div>
      <ModalOverlay active={modalActive} setActive={modalSetActive} details={<IngridientDetails name={props.name} image={props.image} calories={props.calories} proteins={props.proteins} fat={props.fat} carbohydrates={props.carbohydrates} />} />
    </>
  )
}