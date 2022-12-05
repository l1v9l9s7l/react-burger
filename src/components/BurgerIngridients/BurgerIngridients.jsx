import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import styles from './BurgerIngridients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingridient from '../Ingridient/Ingridient';
import Modal from '../Modal/Modal';
import IngridientDetails from '../IngridientDetails/IngridientDetails';
import { IngridientsContext } from '../../services/appContext';
import { store } from '../../services/reducers/rootReducer';

export default function BurgerIngridients(props) {
  const [sauces, setSauces] = React.useState([]);
  const [mains, setMains] = React.useState([]);
  const [buns, setBuns] = React.useState([]);
  const [saucesArr, setSaucesArr] = React.useState([]);
  const [mainsArr, setMainsArr] = React.useState([]);
  const [bunsArr, setBunsArr] = React.useState([]);
  const dispatch = useDispatch()
  const ingridients = useSelector(state => state.ingridients.ingridients)
  const modalOpen = useSelector(state => state.ingridients.openIngridientModal)
  const modalDetail = useSelector(state => state.ingridients.modalDetails)
  const [bunsCategoryActive, setBunsCategoryActive ] = useState(true)
  const [mainsCategoryActive, setMainsCategoryActive ] = useState(false)
  const [saucesCategoryActive, setSaucesCategoryActive ] = useState(false)

//Изменения состояния активности модального окна через dispatch
  const handlerModalOpen = (value) => {              //Создали обработчик открытия модального окна
    dispatch({ type: 'OPEN_INGREDIENT_MODAL', payload: value})                              //Меняем состояние модального окна
  }

  const handlerModalClose = () => {              //Создали обработчик открытия модального окна                             //Задаем параметры при открытии модального окна
    dispatch({ type: 'CLOSE_INGREDIENT_MODAL' })                                       //Меняем состояние модального окна
  }


  //Формирование массивов по категориям и передача их в состояние
  React.useEffect(() => {
    const saucesArr = ingridients.filter(ingridient => {
      if (ingridient.type === 'sauce') {
        return ingridient
      }
    })
    const sauces = saucesArr.map(i => <Ingridient ingridient={i} onModalOpen={handlerModalOpen} key={i._id} />)
    setSauces(sauces)
    setSaucesArr(saucesArr)
  }, [ingridients])

  React.useEffect(() => {
    const mainsArr = ingridients.filter(ingridient => {
      if (ingridient.type === 'main') {
        return ingridient
      }
    })
    const mains = mainsArr.map(i => <Ingridient ingridient={i} onModalOpen={handlerModalOpen} key={i._id} />)
    setMains(mains)
    setMainsArr(mainsArr)
  }, [ingridients])

  React.useEffect(() => {
    const bunsArr = ingridients.filter(ingridient => {
      if (ingridient.type === 'bun') {
        return ingridient
      }
    })
    const buns = bunsArr.map(i => <Ingridient ingridient={i} onModalOpen={handlerModalOpen} key={i._id} />)
    setBuns(buns)
    setBunsArr(bunsArr)
  }, [ingridients])


  const [ingridientsTab, setIngridientsTab] = useState()

//Функция переключения состояний кнопок при скролле
  useEffect(() => {
    setIngridientsTab(document.getElementById('ingridientsTab'))
    function check() {
      if (ingridientsTab === null || ingridientsTab === undefined) {
        return
      } else {
        ingridientsTab.addEventListener('scroll', evt => {
          const scrollPosition = evt.target.scrollTop;
          if (scrollPosition > 280){
            setBunsCategoryActive(false)
            setSaucesCategoryActive(true)
          }
          if (scrollPosition < 280){
            setBunsCategoryActive(true)
            setSaucesCategoryActive(false)

          }
          if (scrollPosition > 800){
            setMainsCategoryActive(true)
            setSaucesCategoryActive(false)
          }
          if (scrollPosition < 800){
            setMainsCategoryActive(false)
          }
        } )
      }
    }
    check()
  }, [ingridientsTab])

  return (
    <section className={styles.ingridients} >

      <h1 className={`${styles.title} pt-10 pb-5`}>Соберите бургер</h1>

      <div className={styles.menu}>
        <Tab className={styles.menuButton} active={bunsCategoryActive}>Булки</Tab>
        <Tab className={styles.menuButton} active={saucesCategoryActive} >Соусы</Tab>
        <Tab className={styles.menuButton} active={mainsCategoryActive}>Начинки</Tab>
      </div>

      <div className={`${styles.scrollDiv} pt-10`} id='ingridientsTab'>

        <h3 className={styles.categories} id='categoriesBuns'>Булки</h3>
        <div className={`${styles.ingridientsGrid} pt-6 pb-10`}>
          {buns}
        </div>

        <h3 className={styles.categories}>Cоусы</h3>
        <div className={`${styles.ingridientsGrid} pt-6 pb-10`}>
          {sauces}
        </div>

        <h3 className={styles.categories}>Начинки</h3>
        <div className={`${styles.ingridientsGrid} pt-6`}>
          {mains}
        </div>
      </div>
      {modalOpen && (   //Если true отобрази модальное окно
        <Modal onModalClose={handlerModalClose} ><IngridientDetails name={modalDetail.name} image={modalDetail.image} proteins={modalDetail.proteins} fat={modalDetail.fat} carbohydrates={modalDetail.carbohydrates} calories={modalDetail.calories} /></Modal>
      )}
    </section>
  )
}
