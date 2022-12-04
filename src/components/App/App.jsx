import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import styles from './App.module.css';
import { IngridientsContext } from '../../services/appContext';
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import { fetchIngredients } from '../../utils/api';
import { getIngridients} from '../../services/actions/ingridientsAction';

function App() {

  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const ingridients = useState([])
  const redIngridients = useSelector(state => state.ingridients.ingridients)

  useEffect(()=> {
    dispatch(getIngridients())
    // console.log(redIngridients)
  }, [dispatch])

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
          <BurgerIngridients  />
          <BurgerConstructor />
        </main>
      </IngridientsContext.Provider>
    </>
  );
}

export default App;

