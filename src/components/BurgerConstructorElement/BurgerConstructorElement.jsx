import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorElement.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setDraggedIngredients } from "../../services/actions/orderAction";
import { uuidv4 } from "../../utils/utils";

export default function BurgerConstructorElement({ data, index }) {
  const dispatch = useDispatch();
  const hoverIndex = index;
  const storeDraggedIngredients = useSelector((state) => state.order.dragIngredients);

  const onSortHandler = (arr, dragIndex) => {
    console.log(arr);
    const element = arr[dragIndex];
    const newArr = [...arr];
    newArr.splice(dragIndex, 1); //Удалить перетаскиваемый элемент со старого места
    newArr.splice(hoverIndex, 0, element); //Вставить перетаскиваемый элемент на место hover-элемента
    dispatch(setDraggedIngredients(newArr));
  };

  const [, drag] = useDrag({
    item: { index },
    type: "sort_ingr",
  });

  const [, drop] = useDrop({
    accept: "sort_ingr",
    drop({ index }) {
      const dragIndex = index;
      onSortHandler(storeDraggedIngredients, dragIndex);
    },
  });

  const deleteIngredient = () => {
    const arr = storeDraggedIngredients.map((i) => i);
    const newArr = arr.splice(index, 1);
    dispatch(setDraggedIngredients(newArr));
  };

  return (
    <div ref={drop}>
      <div className={`${styles.elementWrapper} pt-4`} key={data.id} ref={drag}>
        <DragIcon />
        <ConstructorElement
          handleClose={deleteIngredient}
          text={data.name}
          thumbnail={data.image}
          isLocked={false}
          price={data.price}
        />
      </div>
    </div>
  );
}
