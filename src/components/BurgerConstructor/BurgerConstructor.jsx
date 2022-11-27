import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types'
import styles from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { IngridientsContext } from '../../services/appContext';


// export default function BurgerConstructor(props) {
//   const [elements, setElements] = React.useState([])
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedBun, setSelectedBun] = useState()
//   const [ingridients, setIngridients] = useContext(IngridientsContext)

//   // useEffect(() => {
//   //   const element = ingridients
//   //   function func() {
//   //     if (element.length === 0) {
//   //       console.log(222)
//   //     }
//   //   }

//   //   func()
//   //   setSelectedBun(element)
//   //   console.log(element.saucesArr)
//   // }, [ingridients])


//   const handlerModalOpen = () => {              //Создали обработчик открытия модального окна
//     setModalOpen(true);                                   //Меняем состояние модального окна
//   }

//   const handlerModalClose = () => {              //Создали обработчик открытия модального окна                             //Задаем параметры при открытии модального окна
//     setModalOpen(false);                                   //Меняем состояние модального окна
//   }

//   React.useEffect(() => {
//     const elements = props.data.map(i =>
//       <div className={`${styles.elementWrapper} pt-4`} key={i._id}>
//         <DragIcon />
//         <ConstructorElement text={i.name} thumbnail={i.image} isLocked={false} price={i.price} />
//       </div>
//     )
//     setElements(elements)
//   }, [props.data])

//   return (
//     <>
//       <section className={styles.burgerСonstructor}>
//         <div className={`${styles.topsWrapper} pt-25`}>
//           <ConstructorElement text={`Флюоресцентная булка R2-D3 (верх)`} thumbnail='https://code.s3.yandex.net/react/code/bun-01.png' isLocked='true' price={988} type='top' />
//         </div>
//         <div className={styles.scrollDiv}>
//           {elements.slice(2)}
//           <div className='pt-4'></div>
//         </div>
//         <div className='pt-4'></div>
//         <div className={styles.topsWrapper}>
//           <ConstructorElement text={`Флюоресцентная булка R2-D3 (низ)`} thumbnail='https://code.s3.yandex.net/react/code/bun-01.png' isLocked='true' price={988} type='bottom' />
//           <div className='pt-4'></div>
//         </div>
//         <div className='pt-10'></div>
//         <div className={styles.constructorBottom}>
//           <p>610</p>
//           <div className='pl-2'></div>
//           <CurrencyIcon></CurrencyIcon>
//           <div className='pl-10'></div>
//           <Button size='large' htmlType='button' onClick={handlerModalOpen} >Оформить заказ</Button>
//         </div>
//       </section>
//       {modalOpen && (   //Если true отобрази модальное окно
//         <Modal onModalClose={handlerModalClose}><OrderDetails /></Modal>
//       )}
//     </>
//   )
// }



// BurgerConstructor.propTypes = {
//   data: PropTypes.array
// }












// function reducer(state, action) {
//   switch (action.type) {
//     case 'reset':
//       return state;

//     default:
//       return state;
//   }
// }


export default function BurgerConstructor(props) {
  const [elements, setElements] = React.useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIngridients, setSelectedIngridients] = useState([])
  const [saucesArr, setSaucesArr] = useState([])
  const [mainsArr, setMainsArr] = useState([])
  const [bunsArr, setBunsArr] = useState([])
  let ingridients = useContext(IngridientsContext)


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
        // console.log(ingridients[0])
      }
    }

    check()
  }, [ingridients])



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
        console.log('Ожидайте, идет загрузка ...')
      } else {
        const selectIngridients = mainsArr.concat(saucesArr)
        console.log('Выбранные ингридиенты:')
        console.log(selectIngridients)
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

  useEffect(() => {
    const elements = props.data.map(i =>
      <div className={`${styles.elementWrapper} pt-4`} key={i._id}>
        <DragIcon />
        <ConstructorElement text={i.name} thumbnail={i.image} isLocked={false} price={i.price} />
      </div>
    )
    setElements(elements)
  }, [props.data])

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
        <Modal onModalClose={handlerModalClose}><OrderDetails /></Modal>
      )}
    </>
  )
}