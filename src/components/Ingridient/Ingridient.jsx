import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Ingridient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngridientDetails from '../IngridientDetails/IngridientDetails.jsx'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal'
import ingridientPropTypes from '../../utils/types'
import { useDrag, useDrop } from 'react-dnd/dist/hooks';





export default function Ingridient(props) {
  const [ingridient, setIngridient] = useState({})
  const [{isDragging }, drag] = useDrag({        // 1. Выводит булевое значение переносится элемент или нет 2.ref
    item: {id: props.id, type: props.ingridient.type},
    type: 'typeOne',   
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),        // Выводит булевое значение переносится элемент или нет
    }),
  });

  React.useEffect(() => {
    setIngridient(props.ingridient)
  }, [props.ingridient])

  const handlerModalOpen = () => {
    props.onModalOpen({ name: ingridient.name, image: ingridient.image, fat: ingridient.fat, proteins: ingridient.proteins, calories: ingridient.calories, carbohydrates: ingridient.carbohydrates });
  }

  return (
    <div className={styles.ingridient} onClick={handlerModalOpen} >
      <Counter />
      <img src={ingridient.image} ref={drag} />
      <div className={`${styles.priceWrapper} pt-1`}>
        <p className={styles.price}>{ingridient.price}</p>
        <CurrencyIcon></CurrencyIcon>
      </div>
      <p className={`${styles.ingridientName} pt-1`}>{ingridient.name}</p>
    </div>
  )
}

Ingridient.propTypes = {
  ingridient: PropTypes.shape(ingridientPropTypes)
}