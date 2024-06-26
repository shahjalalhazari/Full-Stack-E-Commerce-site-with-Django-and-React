import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";

import Messages from "../component/Messages";
import CheckoutSteps from "../component/CheckoutSteps";

import { orderCreate } from "../actions/orderAction";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { order, success, error } = useSelector((state) => state.orderCreate);

  // add all the item's price together
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  // if total item's price is more then $100 then shipping cost is $0 else it's $10.
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  // tax rate is 5% according to UAE law
  cart.taxPrice = Number(0.05 * cart.itemsPrice).toFixed(2);
  // add all of them together
  cart.total = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  // if user doesn't select any payment method
  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  // after order success redirect user to order details page & clear order cart.
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate, order, dispatch]);

  const confirmOrderHandler = () => {
    dispatch(
      orderCreate({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.total,
      })
    );
    navigate(`/order/${order._id}`);
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        {/* Left Hand Side Details */}
        <Col md={8}>
          <ListGroup variant="flush">
            {/* Order's Full Address */}
            <ListGroup.Item>
              <h3>Shipping Address</h3>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            {/* Order's Payment Method */}
            <ListGroup.Item>
              <h3>Selected Payment Method:</h3>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            {/* All the selected items of cart */}
            <ListGroup.Item>
              <h4>Selected Items:</h4>
              {cart.cartItems.length === 0 ? (
                <Messages variant="danger">Your cart is empty</Messages>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={10}>
                          <Link to={`/product/${item.product}`}>
                            <h4>{item.name}</h4>
                          </Link>
                          <p>
                            <strong>
                              ${item.price} X {item.quantity} = $
                              {(item.price * item.quantity).toFixed(2)}
                            </strong>
                          </p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Right Hand Side Details */}
        <Col md={4}>
          <Card className="py-2">
            <ListGroup variant="flush" className="d-grid gap-2">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Items:</strong>
                  </Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Shipping Price:</strong>
                  </Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Tax / Vat:</strong>
                  </Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>${cart.total}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Messages variant={"danger"}>{error}</Messages>
                </ListGroup.Item>
              )}
              {!cart.paymentMethod && (
                <ListGroup.Item>
                  <Messages variant={"warning"}>
                    Please go back and select a payment method
                  </Messages>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  style={{ width: "100%" }}
                  disabled={cart.cartItems.length === 0 || !cart.paymentMethod}
                  onClick={confirmOrderHandler}
                >
                  Confirm Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ConfirmOrder;
