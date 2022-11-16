import React, { useState } from 'react';
import PropTypes from 'prop-types'
import styles from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx'
import OrderDetails from '../OrderDetails/OrderDetails';


export default function BurgerConstructor(props) {
  const [modalActive, modalSetActive] = useState(false)
  const [arr, setArr] = React.useState([]);
  const [elements, setElements] = React.useState([])
  const data = props.data

  React.useEffect(() => {
    setArr(data)
  }, [data])

  React.useEffect(() => {
    const elements = arr.map(i =>
      <>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text={i.name} thumbnail={i.image} isLocked={false} price={i.price} />
        </div>
      </>
    )
    setElements(elements)
  }, [arr])

  return (
    <section className={styles.burgerСonstructor}>
      <div className={`${styles.topsWrapper} pt-25`}>
        <ConstructorElement text={`Флюоресцентная булка R2-D3 (верх)`} thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} type='top' />
      </div>
      <div className={styles.scrollDiv}>
        {elements[8]}
        {elements[4]}
        {elements[2]}
        {elements[5]}
        {elements[2]}
        {elements[13]}
        {elements[14]}
        {elements[2]}
        <div className='pt-4'></div>
      </div>
      <div className='pt-4'></div>
      <div className={styles.topsWrapper}>
        <ConstructorElement text={`Флюоресцентная булка R2-D3 (низ)`} thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} type='bottom' />
        <div className='pt-4'></div>
      </div>
      <div className='pt-10'></div>
      <div className={styles.constructorBottom}>
        <p>610</p>
        <div className='pl-2'></div>
        <CurrencyIcon></CurrencyIcon>
        <div className='pl-10'></div>
        <Button size='large' onClick={() => modalSetActive(true)} >Оформить заказ</Button>
      </div>
      <ModalOverlay active={modalActive} setActive={modalSetActive} details={<OrderDetails />} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
}