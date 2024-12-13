import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

import { useSelector, useDispatch } from "react-redux";
import { hideCheckout } from "../store/userProgressSlice";
import { clearCart } from "../store/cartSlice";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const dispatch = useDispatch();
  const userProgress = useSelector((state) => state.userProgress.progress);
  const cartState = useSelector((state) => state.cart);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(`${import.meta.env.VITE_BACKEND_URL}/orders`, requestConfig);

  const cartTotal = cartState.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    dispatch(hideCheckout());
  }

  function handleFinish() {
    dispatch(hideCheckout());
    dispatch(clearCart());
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // {email: ...}

    sendRequest(
      JSON.stringify({
        order: {
          items: cartState.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  // success page
  if (data && !error) {
    return (
      <Modal open={userProgress === "checkout"} onClose={handleClose}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the few
          minutes.
        </p>
        <p className="modal-actions">
          <button onClick={handleFinish}>Okay</button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="'control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
