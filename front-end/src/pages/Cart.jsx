import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addToCart } from "./../actions/cartAction";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import Messages from "../component/Messages";

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

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, productQty));
    }
  }, [dispatch, productId, productQty]);

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Shopping Cart
          </li>
        </ol>
      </nav>

      {/* contents */}
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Messages variant="warning">
              Your cart is empty{" "}
              <Link to="/">
                <strong>Go To Home Page.</strong>
              </Link>
            </Messages>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((product) => (
                <ListGroup.Item key={product.product} className="mb-2">
                  <Row>
                    <Col md={2}>
                      <Link to={`/product/${product.product}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fluid
                          rounded
                        />
                      </Link>
                    </Col>
                    <Col md={5}>
                      <Link to={`/product/${product.product}`}>
                        {product.name}
                      </Link>
                    </Col>
                    <Col md={1}>${product.price}</Col>
                    <Col>
                      <Form.Select
                        as="select"
                        value={product.quantity}
                        onChange={(e) =>
                          dispatch(addToCart(product.product, e.target.value))
                        }
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={1}>
                      <Button type="button" variant="danger">
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
};

export default Cart;
