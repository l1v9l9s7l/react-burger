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
            <p className='pl-2 pr-5'>Конструктор</p>
          </a>
          <a className={`${styles.headerOrderList} pl-2`}>
            <div className={`${styles.navigationIcon} pl-5`}>
              <ListIcon type='secondary' />
            </div>
            <p className='text_color_inactive pl-2 pr-5'>Лента заказов</p>
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

