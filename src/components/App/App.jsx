import { useState, useEffect, Children } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import { fetchIngredients } from '../../utils/api';
import { getIngridients} from '../../services/actions/ingridientsAction';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getIngridients())
  }, [dispatch])


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngridients />
          <BurgerConstructor  />
        </main>
        </DndProvider>
    </>
  );
}

export default App;


