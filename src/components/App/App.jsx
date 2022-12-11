import { useState, useEffect, Children } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import styles from './App.module.css';
import { IngridientsContext } from '../../services/appContext';
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import { fetchIngredients } from '../../utils/api';
import { getIngridients} from '../../services/actions/ingridientsAction';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [elements, setElements] = useState([]);
  const [draggedElements, setDraggedElements] = useState([]);

  const handleDrop = (itemId) => {          //itemId приходит из item у Drop
    setDraggedElements([
        ...draggedElements,
        ...elements.filter(element => element._id === itemId.id)  //При броске элемента добавляем его в draggedElements
    ]);
  };

  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const ingridients = useState([])


  useEffect(()=> {
    dispatch(getIngridients())
  }, [dispatch])

  useEffect(() => {
    fetchIngredients()
      .then((res) => {
        setData(res.data);
        setElements(res.data)
        return res.data
      })
      .catch((err) => alert(err))
  }, [])

  return (
    <>
      <IngridientsContext.Provider value={ingridients}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngridients elements={elements} />
          <BurgerConstructor onDropHandler={handleDrop} draggedElements={draggedElements} setDraggedElements={setDraggedElements} />
        </main>
        </DndProvider>
      </IngridientsContext.Provider>
    </>
  );
}

export default App;


