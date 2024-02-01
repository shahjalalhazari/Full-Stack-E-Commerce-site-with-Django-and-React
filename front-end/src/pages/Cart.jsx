import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart } from "./../actions/cartAction";

const Cart = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // product id
  const productId = location.search && Number(location.pathname.split("/")[2]);
  // product quantity
  const productQty = location.search
    ? Number(location.search.split("=")[1])
    : 1;

  // Select The Cart
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, productQty));
    }
  }, [dispatch, productId, productQty]);

  return (
    <div>
      <h1>Cart...</h1>
    </div>
  );
};

export default Cart;
