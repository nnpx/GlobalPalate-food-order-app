import Button from "./UI/Button";
import logoImg from "../assets/logo.jpg";

import { showCart } from "../store/userProgressSlice";

import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const totalCartItems = cartState.items.reduce((totalNumberOfItems, item) => {
    // initail value of totalNumberOfItems is 0
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    dispatch(showCart());
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restuarant" />
        <h1>GlobalPalate</h1>
        <h2>— Delight Delivered!</h2>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
