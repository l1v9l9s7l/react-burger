import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import styles from './BurgerConstructor.module.css'
import { CurrencyIcon, DragIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../OrderDetails/OrderDetails';
import BurgerConstructorElement from '../BurgerConstructorElement/BurgerConstructorElement';
import Modal from '../Modal/Modal';
import { postOrder } from '../../utils/api';
import { setDraggedIngredients, setDraggedIngredientsMarkup } from '../../services/actions/orderActions';

export default function BurgerConstructor() {
  const dispatch = useDispatch()
  const [bunsArr, setBunsArr] = useState([])
  const [ingridientsIdArr, setIngridientsIdArr] = useState([])
  const orderNumber = useSelector(state => state.order.orderNumber)
  const ingridients = useSelector(state => state.ingridients.ingridients)
  const modalOpen = useSelector(state => state.order.openOrderModal)
  const storeSelectedIngredients = useSelector(state => state.order.dragIngredientsMarkup)
  const storeDraggedIngredients = useSelector(state => state.order.dragIngredients)
  //Массив с данными пернесенных элементов
  const [draggedElements, setDraggedElements] = useState([]);
  //Массив с разметкой перенесенных ингредиентов
  const [selectedIngridients, setSelectedIngridients] = useState([])
  //Массив с данными пернесенных булок
  const [draggedBun, setDraggedBun] = useState([])
  const [selectedTopBun, setSelectedTopBun] = useState([])
  const [selectedBottomBun, setSelectedBottomBun] = useState([])
  const [ingredientsPrice, setIngredientsPrice] = useState(0)
  const [bunPrice, setBunPrice] = useState(0)

  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        // eslint-disable-next-line
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

  //Связали локальное состояние с глобальным
  useEffect(()=> {
    dispatch(setDraggedIngredients(draggedElements))
  }, [draggedElements])
  useEffect(()=> {
    setDraggedElements(storeDraggedIngredients)
  }, [storeDraggedIngredients])


  
  const handleDrop = (data) => {          //itemId приходит из item у Drop

    if(data.type ===  'sauce' || data.type ===  'main'){
      console.log(data.type)
    setDraggedElements([
        ...draggedElements,
        ...ingridients.filter(element => element._id === data.id)  //При броске элемента добавляем его в draggedElements
    ]);} else if(data.type ===  'bun'){
      setDraggedBun([
        ...ingridients.filter(element => element._id === data.id)  //При броске элемента добавляем его в draggedBuns
      ])
      return
    }
  };


  // useEffect(() => {
  //   console.log(draggedBun)
  // }, [draggedBun])

  const[, drop] = useDrop({                            //2. ref
    accept: 'typeOne',
    //data - приходит из Ingredient, содержит id и type ингредиента
    drop(data) {                                    //При сбрасывании элемента происходит drop - handleDrop, в data попадает data Дропа
      handleDrop(data);                          //Передаем в handleDrop data
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
        draggedElements.concat(draggedBun).forEach(item => costDispatcher({ type: "increment", addpay: item.price }));
      }
    }

    check()
  }, [draggedElements])


useEffect(() => {
  dispatch(setDraggedIngredientsMarkup(selectedIngridients))
}, [selectedIngridients])



  useEffect(() => {
        const idArr = storeDraggedIngredients.map(i => { return i._id })
        setIngridientsIdArr(idArr)
        setSelectedIngridients(storeDraggedIngredients.map((i, index) => <BurgerConstructorElement data={i} index={index} key={uuidv4()}/>))
  }, [storeDraggedIngredients])

  useEffect(() => {
    if(draggedBun.length > 0){
    setSelectedTopBun(
    <div key="1">
      <ConstructorElement
        type="top"
        isLocked={true}
        text={draggedBun[0].name + ' (верх)'}
        price={draggedBun[0].price}
        thumbnail={draggedBun[0].image}
      />
    </div>)
    setSelectedBottomBun(
      <div key="1">
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={draggedBun[0].name + ' (низ)'}
        price={draggedBun[0].price}
        thumbnail={draggedBun[0].image}
      />
    </div>
    )}
  }, [draggedBun])

  useEffect(() => {
    const sum = storeDraggedIngredients.map(i => i.price).reduce((a, b) => a + b, 0)
    setIngredientsPrice(sum)
  }, [storeDraggedIngredients])

  useEffect(() => {
    if(draggedBun.length > 0){
      const sum = draggedBun[0].price*2
      setBunPrice(sum)
    } else {
      console.log('Ждумс')
    }
  }, [draggedBun])


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
            {selectedTopBun}
        </div>
        <div className={styles.scrollDiv}>
          {storeSelectedIngredients}
          <div className='pt-4'></div>
        </div>
        <div className='pt-4'></div>
        <div className={styles.topsWrapper}>
          {selectedBottomBun}
          <div className='pt-4'></div>
        </div>
        <div className='pt-10'></div>
        <div className={styles.constructorBottom}>
          <p>{ingredientsPrice + bunPrice}</p>
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