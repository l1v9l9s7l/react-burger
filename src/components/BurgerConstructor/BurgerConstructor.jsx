import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import BurgerConstructorElement from "../BurgerConstructorElement/BurgerConstructorElement";
import Modal from "../Modal/Modal";
import { postOrder } from "../../utils/api";
import { setDraggedIngredients } from "../../services/actions/orderAction";
import { setDraggedBuns } from "../../services/actions/orderAction";
import { setOrderIdsArr } from "../../services/actions/orderDetailsAction";
import { uuidv4 } from "../../utils/utils";
import diamond from "../../images/diamond.svg";
import { useHistory, useLocation } from "react-router-dom";
import { GET_ORDER_NUMBER } from "../../services/actions/orderDetailsAction";
import { SET_CURRENT_PAGE } from "../../services/actions/pageAction";
import { OPEN_ORDER_MODAL } from "../../services/actions/orderDetailsAction";
import { CLOSE_ORDER_MODAL } from "../../services/actions/orderDetailsAction";
import { UPDATE_KEYS } from "../../services/actions/ingridientsAction";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const [ingridientsIdArr, setIngridientsIdArr] = useState([]);
  const orderNumber = useSelector((state) => state.orderDetails.orderNumber);
  const ingridients = useSelector((state) => state.ingridients.ingridients);
  const ingridientsWithKey = ingridients.map((element) => (element.key = uuidv4()));
  const modalOpen = useSelector((state) => state.orderDetails.openOrderModal);
  const storeDraggedIngredients = useSelector((state) => state.order.dragIngredients);
  const storeDraggedBuns = useSelector((state) => state.order.dragBuns);
  //Массив с данными пернесенных элементов
  const [draggedElements, setDraggedElements] = useState(storeDraggedIngredients);
  //Массив с разметкой перенесенных ингредиентов
  const [selectedIngridients, setSelectedIngridients] = useState([]);
  //Массив с данными пернесенных булок
  const [draggedBun, setDraggedBun] = useState(storeDraggedBuns);
  const [ingredientsPrice, setIngredientsPrice] = useState(0);
  const [bunPrice, setBunPrice] = useState(0);
  let history = useHistory();
  const location = useLocation();

  //Связали локальное состояние с глобальным

  //Передаем в глобальное хранилище перенесенные игридиенты из стейта при изменении стейта
  useEffect(() => {
    dispatch(setDraggedIngredients(draggedElements));
  }, [draggedElements]);
  //Изменяем стейт при изменении глобального хранилища
  useEffect(() => {
    setDraggedElements(storeDraggedIngredients);
  }, [storeDraggedIngredients]);

  //Передаем в глобальное хранилище перенесенные булки из стейта
  useEffect(() => {
    dispatch(setDraggedBuns(draggedBun));
  }, [draggedBun]);
  //Изменяем стейт при изменении глобального хранилища
  useEffect(() => {
    setDraggedBun(storeDraggedBuns);
  }, [storeDraggedBuns]);

  const handleDrop = (data, key) => {
    //data приходит из item у Drop

    if (data.type === "sauce" || data.type === "main") {
      setDraggedElements([
        ...draggedElements,
        ...ingridients.filter((element) => element._id === data.id), //При броске элемента добавляем его в draggedElements
      ]);
    } else if (data.type === "bun") {
      setDraggedBun([
        ...ingridients.filter((element) => element._id === data.id), //При броске элемента добавляем его в draggedBuns
      ]);
      return;
    }
  };

  const [, drop] = useDrop({
    accept: "drop_ingr",
    //data - приходит из Ingredient, содержит id и type ингредиента
    //При сбрасывании элемента происходит drop - handleDrop, в data попадает data Дропа
    drop(data) {
      dispatch({ type: UPDATE_KEYS });
      console.log(data);
      handleDrop(data);
    },
  });

  //Отправка id-шников ингридиентов после проверки их наличия
  const getOrderNumber = () => {
    if (ingridientsIdArr.length === 0) {
      return;
    } else {
      postOrder(ingridientsIdArr).then((res) => {
        dispatch({ type: GET_ORDER_NUMBER, payload: res.order.number });
      });
    }
  };

  //Получение айдишников выбранных ингредиентов
  useEffect(() => {
    // console.log(storeDraggedIngredients);
    const ingredientsIdsArr = storeDraggedIngredients.map((i) => {
      return i._id;
    });
    const bunIdsArr = draggedBun.map((i) => {
      return i._id;
    });
    const commonIdsArr = bunIdsArr.concat(ingredientsIdsArr, bunIdsArr);
    setIngridientsIdArr(commonIdsArr);
    setSelectedIngridients(
      storeDraggedIngredients.map((i, index) => (
        <BurgerConstructorElement data={i} index={index} key={i.key} />
      ))
    );
  }, [storeDraggedIngredients, draggedBun]);

  //Разметка булок
  const setBottomBun = () => {
    if (draggedBun.length === 0) {
      return;
    } else {
      return (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={draggedBun[0].name + "(низ)"}
          price={draggedBun[0].price}
          thumbnail={draggedBun[0].image}
          key={1}
        />
      );
    }
  };

  const setTopBun = () => {
    if (draggedBun.length === 0) {
      return;
    } else {
      return (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={draggedBun[0].name + "(верх)"}
          price={draggedBun[0].price}
          thumbnail={draggedBun[0].image}
          key={1}
        />
      );
    }
  };

  const bottomBun = useMemo(setBottomBun, [draggedBun]);
  const topBun = useMemo(setTopBun, [draggedBun]);

  //Подсчет стоимости ингредиентов
  useEffect(() => {
    const sum = storeDraggedIngredients.map((i) => i.price).reduce((a, b) => a + b, 0);
    setIngredientsPrice(sum);
  }, [storeDraggedIngredients]);
  //Подсчет стоимости булок
  useEffect(() => {
    if (draggedBun.length > 0) {
      const sum = draggedBun[0].price * 2;
      setBunPrice(sum);
    } else {
      return;
    }
  }, [draggedBun]);

  const cookieUser = document.cookie.match(
    new RegExp("(?:^|; )" + "user".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  const cookieUserDecode = cookieUser ? decodeURIComponent(cookieUser[1]) : undefined;

  const handlerModalOpen = () => {
    //Создали обработчик открытия модального окна

    if (!cookieUserDecode) {
      dispatch({ type: SET_CURRENT_PAGE, payload: location.pathname });
      history.push({
        pathname: "/login",
      });
    }

    getOrderNumber();
    dispatch({ type: OPEN_ORDER_MODAL }); //Меняем состояние модального окна
  };

  const handlerModalClose = () => {
    //Создали обработчик открытия модального окна
    dispatch({ type: CLOSE_ORDER_MODAL }); //Меняем состояние модального окна
  };

  useEffect(() => {
    dispatch(setOrderIdsArr(ingridientsIdArr));
  }, [ingridientsIdArr]);

  return (
    <>
      <section className={styles.burgerСonstructor} ref={drop}>
        <div className={`${styles.topsWrapper} pt-25`}>{topBun}</div>
        <div className={styles.scrollDiv}>
          {selectedIngridients}
          <div className="pt-4"></div>
        </div>
        <div className="pt-4"></div>
        <div className={styles.topsWrapper}>
          {bottomBun}
          <div className="pt-4"></div>
        </div>
        <div className="pt-10"></div>
        <div className={styles.constructorBottom}>
          <p className={styles.price}>{ingredientsPrice + bunPrice}</p>
          <div className="pl-2"></div>
          <img src={diamond} alt="Diamond" />
          <div className="pl-10"></div>
          <Button size="large" htmlType="button" onClick={handlerModalOpen}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {modalOpen && ( //Если true отобрази модальное окно
        <Modal onModalClose={handlerModalClose}>
          <OrderDetails orderId={orderNumber} />
        </Modal>
      )}
    </>
  );
}
