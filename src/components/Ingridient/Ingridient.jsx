import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Ingridient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import IngridientDetails from '../IngridientDetails/IngridientDetails.jsx'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';



export default function Ingridient(props) {

  const [modalActive, modalSetActive] = useState(false)
  return (
    <>
      <div className={styles.ingridient} onClick={() => modalSetActive(true)}>
        <Counter />
        <img src={props.image} />
        <div className={`${styles.priceWrapper} pt-1`}>
          <p className={styles.price}>{props.price}</p>
          <CurrencyIcon></CurrencyIcon>
        </div>
        <p className={`${styles.ingridientName} pt-1`}>{props.name}</p>
      </div>
      <ModalOverlay active={modalActive} setActive={modalSetActive} details={<IngridientDetails name={props.name} image={props.image} calories={props.calories} proteins={props.proteins} fat={props.fat} carbohydrates={props.carbohydrates} />} />
    </>
  )
}

Ingridient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
}