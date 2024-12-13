import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { addItem } from "./store/cartSlice";
import { UserProgressContextProvider } from "./store/UserProgressContext";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addOne } from "./store/cartSlice";

function App() {
  const cartState = useSelector((state) => state.cart);
  const userProgress = useSelector((state) => state.userProgress.progress);

  const dispatch = useDispatch();

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        {console.log(cartState)}
        {console.log(userProgress)}

        <button onClick={() => dispatch(addOne(cartState))}>button</button>
        {/* {cartState} */}
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
