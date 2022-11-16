import React, { useState } from 'react';
import appStyles from './App.css';
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import { fetchIngredients } from '../../utils/api';

function App() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    fetchIngredients()
      .then((res) => {
        setData(res.data);
        return res.data
      })
  }, [])

  return (
    <>
      <AppHeader />
      <main className='main'>
        <BurgerIngridients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
}

export default App;

