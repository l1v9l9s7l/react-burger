import styles from "./IngredientPage.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "../../hooks/hooks";

export default function IngridientPage() {
  const { id }: any = useParams();
  const ingredient = useSelector((state) =>
    state.ingridients.ingridients.find((item: any) => item._id === id)
  );

  return (
    <div className={styles.details}>
      <p className={styles.title}>Детали ингридиента</p>
      {ingredient !== undefined && <img src={ingredient.image_large} alt="" />}
      {ingredient !== undefined && <p>{ingredient.name}</p>}
      <div className={styles.nutritionals}>
        <div className="mr-5">
          <p>Калории,ккал</p>
          {ingredient !== undefined && <p>{ingredient.calories}</p>}
        </div>
        <div className="mr-5">
          <p>Белки, г</p>
          {ingredient !== undefined && <p>{ingredient.proteins}</p>}
        </div>
        <div className="mr-5">
          <p>Жиры, г</p>
          {ingredient !== undefined && <p>{ingredient.fat}</p>}
        </div>
        <div>
          <p>Углеводы, г</p>
          {ingredient !== undefined && <p>{ingredient.carbohydrates}</p>}
        </div>
      </div>
    </div>
  );
}
