import React, { useState } from 'react';
import styles from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon, CloseIcon, CheckMarkIcon, CurrencyIcon, DragIcon, EditIcon, HideIcon, InfoIcon, ListIcon, LockIcon, LogoutIcon, ProfileIcon, ShowIcon, DeleteIcon, ArrowUpIcon, ArrowDownIcon, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { App } from '../App/App.jsx'
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx'
import OrderDetails from '../OrderDetails/OrderDetails';
import IngridientDetails from '../IngridientDetails/IngridientDetails';


export default function BurgerConstructor() {
  const [modalActive, modalSetActive] = useState(false)
  return (
    <section className={styles.burgerСonstructor}>
      <div className='pt-25'></div>
      <div className={styles.topsWrapper}>
        <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} type='top' />
        <div className='pt-4'></div>
      </div>
      <div className={styles.scrollDiv}>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} />
        </div>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} />
        </div>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} />
        </div>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} />
        </div>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} />
        </div>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} />
        </div>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} />
        </div>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} />
        </div>
        <div className='pt-4'></div>
        <div className={styles.elementWrapper}>
          <DragIcon />
          <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} />
        </div>

        <div className='pt-4'></div>
      </div>
      <div className={styles.topsWrapper}>
        <ConstructorElement text='Zalupa obossanaya XR-01' thumbnail='https://code.s3.yandex.net/react/code/meat-04.png' isLocked='true' price={1488} type='bottom' />
        <div className='pt-4'></div>
      </div>
      <div className='pt-10'></div>
      <div className={styles.constructorBottom}>
        <p>610 Залупкоинов</p>
        <div className='pl-2'></div>
        <CurrencyIcon></CurrencyIcon>
        <div className='pl-10'></div>
        <Button size='large' onClick={() => modalSetActive(true)} >Оформить заказ</Button>
      </div>
      <ModalOverlay active={modalActive} setActive={modalSetActive} details={<OrderDetails />} />
    </section>
  )
}