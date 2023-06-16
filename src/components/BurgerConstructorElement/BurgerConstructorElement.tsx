import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorElement.module.css";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { setDraggedIngredients } from "../../services/actions/orderAction";
import { TDragIngredients, TIngredientsItems } from "../../services/types/data";

export default function BurgerConstructorElement({ data, index }: {data: {id: string, name: string, image: string, price: number}, index: number}) {
  const dispatch = useDispatch();
  const hoverIndex = index;
  const storeDraggedIngredients = useSelector((state) => state.order.dragIngredients);

  const onSortHandler = (arr: TDragIngredients, dragIndex: number) => {
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

  const [, drop] = useDrop<{index: number}>({
    accept: "sort_ingr",
    drop( index ) {
      const dragIndex = index.index;
      onSortHandler(storeDraggedIngredients, dragIndex);
    },
  });

  const deleteIngredient = () => {
    const arr = storeDraggedIngredients.map((i: { calories: number; carbohydrates: number; fat: number; image: string; image_large: string; image_mobile: string; key: string; name: string; price: number; proteins: number; type: string; __v: number; _id: string; id: string; }) => i);
    const newArr = [...arr];
    newArr.splice(index, 1);
    dispatch(setDraggedIngredients(newArr));
  };

  return (
    <div ref={drop}>
      <div className={`${styles.elementWrapper} pt-4`} key={data.id} ref={drag}>
        <DragIcon type="primary" />
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
