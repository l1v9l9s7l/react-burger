import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "../../hooks/hooks";
import styles from "./BurgerIngridients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingridient from "../Ingridient/Ingridient";
import Modal from "../Modal/Modal";
import IngridientDetails from "../IngridientDetails/IngridientDetails";

export default function BurgerIngridients() {
  const [sauces, setSauces] = React.useState<React.ReactNode[]>([]);
  const [mains, setMains] = React.useState<React.ReactNode[]>([]);
  const [buns, setBuns] = React.useState<React.ReactNode[]>([]);
  const ingridients = useSelector((state) => state.ingridients.ingridients);
  const [bunsCategoryActive, setBunsCategoryActive] = useState(true);
  const [mainsCategoryActive, setMainsCategoryActive] = useState(false);
  const [saucesCategoryActive, setSaucesCategoryActive] = useState(false);

  //Формирование массивов по категориям и передача их в состояние
  React.useEffect(() => {
    const saucesArr = ingridients.filter((ingridient) => {
      if (ingridient.type === "sauce") {
        return ingridient;
      }
    });
    const sauces = saucesArr.map((i) => <Ingridient ingridient={i} id={i._id} key={i._id} />);
    setSauces(sauces);
  }, [ingridients]);

  React.useEffect(() => {
    const mainsArr = ingridients.filter((ingridient) => {
      if (ingridient.type === "main") {
        return ingridient;
      }
    });
    const mains = mainsArr.map((i) => <Ingridient ingridient={i} id={i._id} key={i._id} />);
    setMains(mains);
  }, [ingridients]);

  React.useEffect(() => {
    const bunsArr = ingridients.filter((ingridient) => {
      if (ingridient.type === "bun") {
        return ingridient;
      }
    });
    const buns = bunsArr.map((i) => <Ingridient ingridient={i} id={i._id} key={i._id} />);
    setBuns(buns);
  }, [ingridients]);

  const [ingridientsTab, setIngridientsTab] = useState<HTMLElement | null>();

  //Функция переключения состояний кнопок при скролле
  useEffect(() => {
    setIngridientsTab(document.getElementById("ingridientsTab"));
    function check() {
      if (ingridientsTab === null || ingridientsTab === undefined) {
        return;
      } else {
        ingridientsTab.addEventListener("scroll", (evt) => {
          const scrollPosition = (evt.target as HTMLElement).scrollTop;
          if (scrollPosition > 280) {
            setBunsCategoryActive(false);
            setSaucesCategoryActive(true);
          }
          if (scrollPosition < 280) {
            setBunsCategoryActive(true);
            setSaucesCategoryActive(false);
          }
          if (scrollPosition > 800) {
            setMainsCategoryActive(true);
            setSaucesCategoryActive(false);
          }
          if (scrollPosition < 800) {
            setMainsCategoryActive(false);
          }
        });
      }
    }
    check();
  }, [ingridientsTab]);

  return (
    <section className={styles.ingridients}>
      <h1 className={`${styles.title} pt-10 pb-5`}>Соберите бургер</h1>

      <div className={styles.menu}>
        <Tab className={styles.menuButton} active={bunsCategoryActive}>
          Булки
        </Tab>
        <Tab className={styles.menuButton} active={saucesCategoryActive}>
          Соусы
        </Tab>
        <Tab className={styles.menuButton} active={mainsCategoryActive}>
          Начинки
        </Tab>
      </div>

      <div className={`${styles.scrollDiv} pt-10`} id="ingridientsTab">
        <h3 className={styles.categories} id="categoriesBuns">
          Булки
        </h3>
        <div className={`${styles.ingridientsGrid} pt-6 pb-10`}>{buns}</div>

        <h3 className={styles.categories}>Cоусы</h3>
        <div className={`${styles.ingridientsGrid} pt-6 pb-10`}>{sauces}</div>

        <h3 className={styles.categories}>Начинки</h3>
        <div className={`${styles.ingridientsGrid} pt-6`}>{mains}</div>
      </div>
    </section>
  );
}
