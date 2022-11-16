import React, { useState } from 'react';
import appStyles from './App.css';
import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import { fetchIngredients } from '../../utils/api';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';






function App() {

  return (
    <>
      <AppHeader />
      <main className='main'>
        <BurgerIngridients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;

