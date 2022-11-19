import { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import { fetchIngredients } from '../../utils/api';
import Modal from '../Modal/Modal';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchIngredients()
      .then((res) => {
        setData(res.data);
        return res.data
      })
      .catch((err) => alert(err))
  }, [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngridients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
}

export default App;

