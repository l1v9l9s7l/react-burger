import { useState, useEffect, useContext } from 'react';
import styles from './App.module.css';
import { IngridientsContext } from '../../services/appContext';
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import { fetchIngredients } from '../../utils/api';

function App() {

  const [data, setData] = useState([])
  const ingridients = useState([])
  const ingridientsByCategory = useState({
    saucesArr: [],
    mainsArr: [],
    bunsArr: []
  })


  useEffect(() => {
    function check() {
      if (ingridients[0].length === 0) {
        // console.log('Ожидайте, идет загрузка ...')
      } else {
        // console.log('Ответ получен:')
        // console.log(ingridients[0])
      }
    }

    check()
  }, [ingridients])


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
      <IngridientsContext.Provider value={ingridients}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngridients data={data} />
          <BurgerConstructor data={data} />
        </main>
      </IngridientsContext.Provider>
    </>
  );
}

export default App;

