import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Ingridient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngridientDetails from '../IngridientDetails/IngridientDetails.jsx'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal'
import ingridientPropTypes from '../../utils/types'





export default function Ingridient(props) {

  const handlerModalOpen = () => {
    props.onModalOpen({ name: props.name, image: props.image, fat: props.fat, proteins: props.proteins, calories: props.calories, carbohydrates: props.carbohydrates });
  }

  return (
    <>
      <div className={styles.ingridient} onClick={handlerModalOpen}>
        <Counter />
        <img src={props.image} />
        <div className={`${styles.priceWrapper} pt-1`}>
          <p className={styles.price}>{props.price}</p>
          <CurrencyIcon></CurrencyIcon>
        </div>
        <p className={`${styles.ingridientName} pt-1`}>{props.name}</p>
      </div>
    </>
  )
}

Ingridient.propTypes = ingridientPropTypes