import { Col, Image, ListGroup, Row } from "react-bootstrap";
import CheckoutSteps from "../component/CheckoutSteps";
import { useSelector } from "react-redux";
import Messages from "../component/Messages";
import { Link } from "react-router-dom";

const ConfirmOrder = () => {
  const cart = useSelector((state) => state.cart);
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
        <Col md={4}></Col>
      </Row>
    </div>
  );
};

export default ConfirmOrder;
