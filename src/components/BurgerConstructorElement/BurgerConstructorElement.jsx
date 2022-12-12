import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement , DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerConstructorElement.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { setDraggedIngredientsMarkup } from '../../services/actions/orderActions';
import { setDraggedIngredients } from "../../services/actions/orderActions";
import React, { useState, useContext, useEffect, useCallback } from 'react';







export default function BurgerConstructorElement({data, index}){
  const dispatch = useDispatch()
  const hoverIndex = index
  const storeDraggedIngredients = useSelector(state => state.order.dragIngredients)

  const onSortHandler = (arr, dragIndex) => {
    var element = arr[dragIndex];
    arr.splice(dragIndex, 1);  //Удалить перетаскиваемый элемент со старого места
    arr.splice(hoverIndex, 0, element); //Вставить перетаскиваемый элемент на место hover-элемента
    const ingredientsMarkup = arr.map((i, index) => <BurgerConstructorElement data={i} index={index} />) //Массив с разметкой перетянутых ингридиентов
    dispatch(setDraggedIngredientsMarkup(ingredientsMarkup))
  }

  const [, drag] = useDrag({       
    item: {index},
    type: 'typeTwo',   
  });

  const[, drop] = useDrop({                      
    accept: 'typeTwo',                               
    drop({index}) {    
      const dragIndex = index                          
      onSortHandler(storeDraggedIngredients, dragIndex);                          
  },
  })

  const deleteIngredient= () => {
    let arr = storeDraggedIngredients.map(i => i)
    arr.splice(index,1)
    dispatch(setDraggedIngredients(arr))
  }
  

  return(
    <div ref={drop}>
    <div className={`${styles.elementWrapper} pt-4`} key={data.id}  ref={drag}>
          <DragIcon />
          <ConstructorElement handleClose={deleteIngredient} text={data.name} thumbnail={data.image} isLocked={false} price={data.price} />
    </div>
    </div>
  )
}