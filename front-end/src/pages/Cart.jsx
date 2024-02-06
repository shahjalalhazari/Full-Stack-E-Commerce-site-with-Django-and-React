import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "./../actions/cartAction";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Messages from "../component/Messages";

const Cart = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const removeFromCartHandler = (id) => {
    console.log(id);
  };

  const checkoutHandler = () => {
    console.log("Go to shipping page");
    navigate(`/login?redirect=shipping`);
  };

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
                          dispatch(
                            addToCart(product.product, Number(e.target.value))
                          )
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
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => removeFromCartHandler(product.product)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Total:{" "}
                  <strong>
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  </strong>
                  Items
                </h2>
                <h3>
                  Price:&nbsp;
                  <strong>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </strong>
                </h3>
              </ListGroup.Item>
            </ListGroup>
            <Button
              type="button"
              className="btn-block m-3"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
