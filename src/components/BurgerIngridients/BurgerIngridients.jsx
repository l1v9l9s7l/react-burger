import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import styles from './BurgerIngridients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingridient from '../Ingridient/Ingridient';

export default function BurgerIngridients(props) {
  const [arr, setArr] = React.useState([]);
  const [sauces, setSauces] = React.useState([]);
  const [mains, setMains] = React.useState([]);
  const [buns, setBuns] = React.useState([]);

  const data = props.data

  React.useEffect(() => {
    setArr(data)
  }, [data])


  React.useEffect(() => {
    const saucesArr = arr.filter(ingridient => {
      if (ingridient.type === 'sauce') {
        return ingridient
      }
    })
    const sauces = saucesArr.map(i => <Ingridient name={i.name} image={i.image_large} price={i.price} calories={i.calories} proteins={i.proteins} fat={i.fat} carbohydrates={i.carbohydrates} key={i._id} />)
    setSauces(sauces)
  }, [arr])

  React.useEffect(() => {
    const mainsArr = arr.filter(ingridient => {
      if (ingridient.type === 'main') {
        return ingridient
      }
    })
    const mains = mainsArr.map(i => <Ingridient name={i.name} image={i.image_large} price={i.price} calories={i.calories} proteins={i.proteins} fat={i.fat} carbohydrates={i.carbohydrates} key={i._id} />)
    setMains(mains)
  }, [arr])

  React.useEffect(() => {
    const bunsArr = arr.filter(ingridient => {
      if (ingridient.type === 'bun') {
        return ingridient
      }
    })
    const buns = bunsArr.map(i => <Ingridient name={i.name} image={i.image_large} price={i.price} calories={i.calories} proteins={i.proteins} fat={i.fat} carbohydrates={i.carbohydrates} key={i._id} />)
    setBuns(buns)
  }, [arr])


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

    </section>
  )
}

BurgerIngridients.propTypes = {
  data: PropTypes.array.isRequired
}