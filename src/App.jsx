import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function App() {
  const cartState = useSelector((state) => state.cart);
  // const userProgress = useSelector((state) => state.userProgress.progress);

  const dispatch = useDispatch();

  return (
    <>
      {/* {console.log(cartState)}
        {console.log(userProgress)} */}

      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </>
  );
}

export default App;
