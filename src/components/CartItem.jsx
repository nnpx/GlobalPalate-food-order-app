import { currencyFormatter } from "../util/formatting";

import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";

export default function CartItem({ id, name, quantity, price }) {
  const dispatch = useDispatch();

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => dispatch(removeItem(id))}>-</button>

        <p>{quantity}</p>
        <button onClick={() => dispatch(addItem({ id, name, price }))}>
          +
        </button>
      </p>
    </li>
  );
}
