import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement , DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerConstructorElement.module.css'
import { useEffect } from "react";




export default function BurgerConstructorElement({data, index, draggedElements, setSelectedIngridients, setDraggedElements}){

  const hoverIndex = index
  const onSortHandler = (arr, dragIndex) => {
    console.log(setDraggedElements)
    var element = arr[dragIndex];
    arr.splice(dragIndex, 1);  //Удалить перетаскиваемый элемент со старого места
    arr.splice(hoverIndex, 0, element); //Вставить перетаскиваемый элемент на место hover-элемента
    setDraggedElements(arr)
    const selectedIngridients = arr.map((i, index) => <BurgerConstructorElement data={i} index={index} />) //Массив с разметкой перетянутых ингридиентов
    setSelectedIngridients(selectedIngridients)
    console.log(arr)
  }

  useEffect(() => {
    console.log(draggedElements)
  }, [draggedElements])

  const [, drag] = useDrag({       
    item: {data, index},
    type: 'typeTwo',   
  });

  const[, drop] = useDrop({                      
    accept: 'typeTwo',                               
    drop({data, index}) {    
      const dragIndex = index                          
      onSortHandler(draggedElements, dragIndex);                          
  },
  })


  return(
    <div ref={drop}>
    <div className={`${styles.elementWrapper} pt-4`} key={data.id}  ref={drag}>
          <DragIcon />
          <ConstructorElement text={data.name} thumbnail={data.image} isLocked={false} price={data.price} />
    </div>
    </div>
  )
}