import React, { useState } from 'react';
import PropTypes from 'prop-types'
import styles from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';


export default function BurgerConstructor(props) {
  const [arr, setArr] = React.useState([]);
  const [elements, setElements] = React.useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const data = props.data

  const handlerModalOpen = (value) => {              //Создали обработчик открытия модального окна
    setModalOpen(true);                                   //Меняем состояние модального окна
  }

  const handlerModalClose = () => {              //Создали обработчик открытия модального окна                             //Задаем параметры при открытии модального окна
    setModalOpen(false);                                   //Меняем состояние модального окна
  }

  React.useEffect(() => {
    const closeOnEsc = (evt) => {
      evt.code === 'Escape' && setModalOpen(false);
    };
    document.addEventListener('keydown', closeOnEsc);

    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    }
  }, []);



  React.useEffect(() => {
    setArr(data)
  }, [data])

  React.useEffect(() => {
    const elements = arr.map(i =>
      <>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text={i.name} thumbnail={i.image} isLocked={false} price={i.price} key={i._id} />
        </div>
      </>
    )
    setElements(elements)
  }, [arr])

  return (
    <>
      <section className={styles.burgerСonstructor}>
        <div className={`${styles.topsWrapper} pt-25`}>
          <ConstructorElement text={`Флюоресцентная булка R2-D3 (верх)`} thumbnail='https://code.s3.yandex.net/react/code/bun-01.png' isLocked='true' price={1488} type='top' />
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
          <ConstructorElement text={`Флюоресцентная булка R2-D3 (низ)`} thumbnail='https://code.s3.yandex.net/react/code/bun-01.png' isLocked='true' price={1488} type='bottom' />
          <div className='pt-4'></div>
        </div>
        <div className='pt-10'></div>
        <div className={styles.constructorBottom}>
          <p>610</p>
          <div className='pl-2'></div>
          <CurrencyIcon></CurrencyIcon>
          <div className='pl-10'></div>
          <Button size='large' htmlType='button' onClick={handlerModalOpen} >Оформить заказ</Button>
        </div>
      </section>
      {modalOpen && (   //Если true отобрази модальное окно
        <Modal onModalClose={handlerModalClose} details={<OrderDetails />} />
      )}
    </>
  )
}



BurgerConstructor.propTypes = {
  data: PropTypes.array
}