import React, { useState, useContext, useEffect } from 'react';
import styles from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { IngridientsContext } from '../../services/appContext';
import { postOrder } from '../../utils/api';

export default function BurgerConstructor() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIngridients, setSelectedIngridients] = useState([])
  const [saucesArr, setSaucesArr] = useState([])
  const [mainsArr, setMainsArr] = useState([])
  const [bunsArr, setBunsArr] = useState([])
  const [ingridientsIdArr, setIngridientsIdArr] = useState([])
  const [orderId, setOrderId] = useState([])
  const ingridients = useContext(IngridientsContext)


  useEffect(() => {
    function check() {
      if (ingridients[0].length === 0) {
        return
      } else {
        setSaucesArr(ingridients[0].filter(ingridient => {
          if (ingridient.type === 'sauce') {
            return ingridient
          }
        }))
        setMainsArr(ingridients[0].filter(ingridient => {
          if (ingridient.type === 'main') {
            return ingridient
          }
        }))
        setBunsArr(ingridients[0].filter(ingridient => {
          if (ingridient.type === 'bun') {
            return ingridient
          }
        }))
      }
    }
    check()
  }, [ingridients])


  useEffect(() => {
    function check() {
      if (ingridientsIdArr.length === 0) {
        return
      } else {
        console.log()
        postOrder(ingridientsIdArr)
          .then((res) => {
            setOrderId(res.order.number)
          }
          )
      }
    }
    check()
  }, [ingridientsIdArr])

  const costInitialState = { count: 0 };       //Начальное состояние

  const costReducer = (costState, action) => {           //costState - 0
    switch (action.type) {
      case "increment":
        return { count: costState.count + action.addpay };
      case "decrement":
        return { count: costState.count - action.addpay };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    };
  };

  const [costState, costDispatcher] = React.useReducer(costReducer, costInitialState);  //costState = count: 0


  useEffect(() => {
    function check() {
      if (saucesArr.length === 0 || mainsArr === 0) {
        return
      } else {
        mainsArr.concat(saucesArr).concat(saucesArr).forEach(item => costDispatcher({ type: "increment", addpay: item.price }));
      }
    }

    check()
  }, [saucesArr])

  useEffect(() => {
    function check() {
      if (saucesArr.length === 0 || mainsArr === 0) {
        return
      } else {
        const selectIngridients = mainsArr.concat(saucesArr)
        console.log(selectIngridients)
        const idArr = selectIngridients.map(i => { return i._id })
        setIngridientsIdArr(idArr)
        const selectedIngridients = selectIngridients.map(i =>
          <div className={`${styles.elementWrapper} pt-4`} key={i._id}>
            <DragIcon />
            <ConstructorElement text={i.name} thumbnail={i.image} isLocked={false} price={i.price} />
          </div>)
        setSelectedIngridients(selectedIngridients)
      }
    }
    check()
  }, [saucesArr])

  const handlerModalOpen = () => {              //Создали обработчик открытия модального окна
    setModalOpen(true);                                   //Меняем состояние модального окна
  }

  const handlerModalClose = () => {              //Создали обработчик открытия модального окна                             //Задаем параметры при открытии модального окна
    setModalOpen(false);                                   //Меняем состояние модального окна
  }

  return (
    <>
      <section className={styles.burgerСonstructor}>
        <div className={`${styles.topsWrapper} pt-25`}>
          {bunsArr.filter((i, index) => index === 1)
            .map(i =>
              <div key="1">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={i.name + ' (верх)'}
                  price={i.price}
                  thumbnail={i.image}
                />
              </div>
            )}
        </div>
        <div className={styles.scrollDiv}>
          {selectedIngridients}
          <div className='pt-4'></div>
        </div>
        <div className='pt-4'></div>
        <div className={styles.topsWrapper}>
          {bunsArr.filter((i, index) => index === 1)
            .map(i =>
              <div key="1">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={i.name + ' (низ)'}
                  price={i.price}
                  thumbnail={i.image}
                />
              </div>
            )}
          <div className='pt-4'></div>
        </div>
        <div className='pt-10'></div>
        <div className={styles.constructorBottom}>
          <p>{costState.count + 1976}</p>
          <div className='pl-2'></div>
          <CurrencyIcon></CurrencyIcon>
          <div className='pl-10'></div>
          <Button size='large' htmlType='button' onClick={handlerModalOpen} >Оформить заказ</Button>
        </div>
      </section>
      {modalOpen && (   //Если true отобрази модальное окно
        <Modal onModalClose={handlerModalClose}><OrderDetails orderId={orderId} /></Modal>
      )}
    </>
  )
}