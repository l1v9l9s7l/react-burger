import styles from './AppHeader.module.css'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  BurgerIcon, CloseIcon, CheckMarkIcon, CurrencyIcon, DragIcon, EditIcon, HideIcon, InfoIcon, ListIcon, LockIcon, LogoutIcon, ProfileIcon, ShowIcon,
  DeleteIcon, ArrowUpIcon, ArrowDownIcon, MenuIcon
} from '@ya.praktikum/react-developer-burger-ui-components';


export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.navigation}>
          <a className={styles.headerConstructor}>
            <div className='pl-5'></div>
            <BurgerIcon />
            <div className='pl-2'></div>
            <p>Конструктор</p>
            <div className='pl-5'></div>
          </a>
          <div className='pl-2'></div>
          <a className={styles.headerOrderList}>
            <div className='pl-5'></div>
            <div className={styles.navigationIcon}>
              <ListIcon type='secondary' />
            </div>
            <div className='pl-2'></div>
            <p className='text_color_inactive'>Лента заказов</p>
            <div className='pl-5'></div>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a href="#" className={styles.profile}>
          <ProfileIcon type='secondary' />
          <p className={`${styles.profileText} ${styles.text_color_inactive}`} >Личный кабинет</p>
        </a>
      </div>
    </header >
  )
}

