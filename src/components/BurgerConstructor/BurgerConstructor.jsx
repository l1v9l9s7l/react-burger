import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import styles from './BurgerConstructor.module.css'
import { CurrencyIcon, DragIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../OrderDetails/OrderDetails';
// import BurgerConstructorElement from '../BurgerConstructorElement/BurgerConstructorElement';
import Modal from '../Modal/Modal';
import { postOrder } from '../../utils/api';

export default function BurgerConstructor({draggedElements, onDropHandler, setDraggedElements}) {
  const dispatch = useDispatch()
  const [selectedIngridients, setSelectedIngridients] = useState([])
  const [bunsArr, setBunsArr] = useState([])
  const [ingridientsIdArr, setIngridientsIdArr] = useState([])
  const [selectIngridients, setSelectIngridients] = useState([])

  const orderNumber = useSelector(state => state.order.orderNumber)
  const ingridients = useSelector(state => state.ingridients.ingridients)
  const modalOpen = useSelector(state => state.order.openOrderModal)

  const[, drop] = useDrop({                            //2. ref
    accept: 'typeOne',                                //Тип принимаего элемента
    drop(itemId) {                                    //При сбрасывании элемента происходит drop - handleDrop, в itemId попадает item Дропа
      onDropHandler(itemId);                          //Передаем в handleDrop itemId
  },
  })

//Формирование массивов после проверки наличия данных
  useEffect(() => {
    function check() {
      if (ingridients.length === 0) {
        return
      } else {
        setBunsArr(ingridients.filter(ingridient => {
          if (ingridient.type === 'bun') {
            return ingridient
          }
        }))
      }
    }
    check()
  }, [ingridients])

//Отправка id-шников ингридиентов после проверки их наличия
  useEffect(() => {
    function check() {
      if (ingridientsIdArr.length === 0) {
        return
      } else {
        postOrder(ingridientsIdArr)
          .then((res) => {
            dispatch({type: 'GET_ORDER_NUMBER', payload: res.order.number })
          }
          )
      }
    }
    check()
  }, [ingridientsIdArr])

  //Редьюсер подсчета состояния
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

//Счетчик
  useEffect(() => {
    function check() {
      if (draggedElements.length === 0) {
        return
      } else {
        draggedElements.forEach(item => costDispatcher({ type: "increment", addpay: item.price }));
      }
    }

    check()
  }, [draggedElements])


  //data - информация об ингридиенте, index - номер в массиве
  function BurgerConstructorElement({data, index}){
    const hoverIndex = index
    const onSortHandler = (arr, dragIndex) => {
      var element = arr[dragIndex];
      arr.splice(dragIndex, 1);  //Удалить перетаскиваемый элемент со старого места
      arr.splice(hoverIndex, 0, element); //Вставить перетаскиваемый элемент на место hover-элемента
      const selectedIngridients = arr.map((i, index) => <BurgerConstructorElement data={i} index={index} />) //Массив с разметкой перетянутых ингридиентов
      setSelectedIngridients(selectedIngridients)
      console.log(arr)
    }

    const [, drag] = useDrag({       
      item: {index},
      type: 'typeTwo',   
    });

    const[, drop] = useDrop({                      
      accept: 'typeTwo',                               
      drop({index}) {    
        const dragIndex = index                          
        onSortHandler(draggedElements, dragIndex);                          
    },
    })

    return(
      <div ref={drop}>
      <div className={`${styles.elementWrapper} pt-4`} key={data.id}  ref={drag}>
            <DragIcon />
            <ConstructorElement text={data.name} thumbnail={data.image} isLocked={false} price={data.price} />
      </div>
      </div>
    )
  }

  useEffect(() => {
        setSelectIngridients(draggedElements)   //Массив с данными перетянутых ингридиентов
        const idArr = selectIngridients.map(i => { return i._id })
        setIngridientsIdArr(idArr)
        const selectedIngridients = draggedElements.map((i, index) => <BurgerConstructorElement data={i} index={index} draggedElements={draggedElements} setSelectedIngridients={setSelectedIngridients} setDraggedElements={setDraggedElements} />) //Массив с разметкой перетянутых ингридиентов
        setSelectedIngridients(selectedIngridients)
  }, [draggedElements])


  const handlerModalOpen = () => {              //Создали обработчик открытия модального окна
    // setModalOpen(true);
    dispatch({type: 'OPEN_ORDER_MODAL'})                                   //Меняем состояние модального окна
  }

  const handlerModalClose = () => {              //Создали обработчик открытия модального окна                             //Задаем параметры при открытии модального окна
    // setModalOpen(false); 
    dispatch({type: 'CLOSE_ORDER_MODAL'})                                   //Меняем состояние модального окна
  }
  return (
    <>
      <section className={styles.burgerСonstructor} ref={drop}>
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
        <Modal onModalClose={handlerModalClose}><OrderDetails orderId={orderNumber} /></Modal>
      )}
    </>
  )
}