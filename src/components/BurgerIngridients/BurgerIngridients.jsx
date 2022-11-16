import React, { useState, useEffect } from 'react';
import styles from './BurgerIngridients.module.css'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon, CloseIcon, CheckMarkIcon, DragIcon, EditIcon, HideIcon, InfoIcon, ListIcon, LockIcon, LogoutIcon, ProfileIcon, ShowIcon, DeleteIcon, ArrowUpIcon, ArrowDownIcon, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingridient from '../Ingridient/Ingridient';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx'
import { fetchIngredients } from '../../utils/api';

export default function BurgerIngridients() {
  const [arr, setArr] = React.useState([]);
  const [sauces, setSauces] = React.useState([]);
  const [mains, setMains] = React.useState([]);
  const [buns, setBuns] = React.useState([]);

  React.useEffect(() => {
    fetchIngredients()
      .then((res) => {
        setArr(res.data);
        return res.data
      })
  }, [])

  React.useEffect(() => {
    const saucesArr = arr.filter(ingridient => {
      if (ingridient.type === 'sauce') {
        return ingridient
      }
    })
    const sauces = saucesArr.map(x => <Ingridient name={x.name} image={x.image_large} price={x.price} calories={x.calories} proteins={x.proteins} fat={x.fat} carbohydrates={x.carbohydrates} />)
    setSauces(sauces)
  }, [arr])

  React.useEffect(() => {
    const mainsArr = arr.filter(ingridient => {
      if (ingridient.type === 'main') {
        return ingridient
      }
    })
    const mains = mainsArr.map(x => <Ingridient name={x.name} image={x.image_large} price={x.price} calories={x.calories} proteins={x.proteins} fat={x.fat} carbohydrates={x.carbohydrates} />)
    setMains(mains)
  }, [arr])

  React.useEffect(() => {
    const bunsArr = arr.filter(ingridient => {
      if (ingridient.type === 'bun') {
        return ingridient
      }
    })
    const buns = bunsArr.map(x => <Ingridient name={x.name} image={x.image_large} price={x.price} calories={x.calories} proteins={x.proteins} fat={x.fat} carbohydrates={x.carbohydrates} />)
    setBuns(buns)
  }, [arr])


  return (
    <section className={styles.ingridients}>

      <div className='pt-10'></div>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className='pt-5'></div>

      <div className={styles.menu}>
        <Tab className={styles.menuButton} active='true'>Булки</Tab>
        <Tab className={styles.menuButton} >Соусы</Tab>
        <Tab className={styles.menuButton}>Начинки</Tab>
      </div>

      <div className='pt-10'></div>
      <div className={styles.scrollDiv}>

        <h3 className={styles.categories}>Булки</h3>
        <div className='pt-6'></div>
        <div className={styles.ingridientsGrid}>
          {buns}
        </div>
        <div className='pt-10'></div>

        <h3 className={styles.categories}>Cоусы</h3>
        <div className='pt-6'></div>
        <div className={styles.ingridientsGrid}>
          {sauces}
        </div>
        <div className='pt-10'></div>

        <h3 className={styles.categories}>Начинки</h3>
        <div className='pt-6'></div>
        <div className={styles.ingridientsGrid}>
          {mains}
        </div>
      </div>

    </section>
  )
}