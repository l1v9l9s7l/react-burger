import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import styles from './BurgerIngridients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingridient from '../Ingridient/Ingridient';
import Modal from '../Modal/Modal';
import IngridientDetails from '../IngridientDetails/IngridientDetails';

export default function BurgerIngridients(props) {
  const [sauces, setSauces] = React.useState([]);
  const [mains, setMains] = React.useState([]);
  const [buns, setBuns] = React.useState([]);


  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ name: '', image: '', calories: '', fat: '', proteins: '', carbohydrates: '' });

  const handlerModalOpen = (value) => {              //Создали обработчик открытия модального окна
    setModalInfo(value)                              //Задаем параметры при открытии модального окна
    setModalOpen(true);                                   //Меняем состояние модального окна
  }

  const handlerModalClose = () => {              //Создали обработчик открытия модального окна                             //Задаем параметры при открытии модального окна
    setModalOpen(false);                                   //Меняем состояние модального окна
  }


  React.useEffect(() => {
    const saucesArr = props.data.filter(ingridient => {
      if (ingridient.type === 'sauce') {
        return ingridient
      }
    })
    const sauces = saucesArr.map(i => <Ingridient ingridient={i} onModalOpen={handlerModalOpen} key={i._id} />)
    setSauces(sauces)
  }, [props.data])

  React.useEffect(() => {
    const mainsArr = props.data.filter(ingridient => {
      if (ingridient.type === 'main') {
        return ingridient
      }
    })
    const mains = mainsArr.map(i => <Ingridient ingridient={i} onModalOpen={handlerModalOpen} key={i._id} />)
    setMains(mains)
  }, [props.data])

  React.useEffect(() => {
    const bunsArr = props.data.filter(ingridient => {
      if (ingridient.type === 'bun') {
        return ingridient
      }
    })
    const buns = bunsArr.map(i => <Ingridient ingridient={i} onModalOpen={handlerModalOpen} key={i._id} />)
    setBuns(buns)
  }, [props.data])


  return (
    <section className={styles.ingridients}>

      <h1 className={`${styles.title} pt-10 pb-5`}>Соберите бургер</h1>

      <div className={styles.menu}>
        <Tab className={styles.menuButton} active='true'>Булки</Tab>
        <Tab className={styles.menuButton} >Соусы</Tab>
        <Tab className={styles.menuButton}>Начинки</Tab>
      </div>

      <div className={`${styles.scrollDiv} pt-10`}>

        <h3 className={styles.categories}>Булки</h3>
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
        <Modal onModalClose={handlerModalClose} ><IngridientDetails name={modalInfo.name} image={modalInfo.image} proteins={modalInfo.proteins} fat={modalInfo.fat} carbohydrates={modalInfo.carbohydrates} calories={modalInfo.calories} /></Modal>
      )}
    </section>
  )
}

BurgerIngridients.propTypes = {
  data: PropTypes.array.isRequired
}

