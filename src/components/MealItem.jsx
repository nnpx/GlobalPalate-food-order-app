import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";

import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

export default function MealItem({ meal }) {
  const dispatch = useDispatch();
  const id = meal.id;
  const name = meal.name;
  const price = meal.price;

  return (
    <li className="meal-item">
      <article>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${meal.image}`}
          alt={meal.name}
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {/* <Button onClick={handleAddMealToCart}>Add to cart</Button> */}
          <Button onClick={() => dispatch(addItem({ id, name, price }))}>
            Add to cart
          </Button>
        </p>
      </article>
    </li>
  );
}
