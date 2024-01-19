/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import listProductDetails from "./../actions/productDetailsAction";
import ProductRating from "../component/ProductRating";
import LoadingSpinner from "../component/LoadingSpinner";
import Messages from "./../component/Messages";

const ProductDetails = () => {
  // Get the id parameter from the URL
  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [id, dispatch]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {loading ? (
        // loading
        <LoadingSpinner />
      ) : error ? (
        // display messages
        <Messages variant={"danger"}>{error}</Messages>
      ) : (
        // display content
        <div className="mt-5">
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <ProductRating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  <h3>
                    Price: <strong>${product.price}</strong>
                  </h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <p>
                    <strong>Description:</strong> {product.description}
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-center">
                    <Button
                      className="btn-block"
                      disabled={product.countInStock == 0}
                      type="button"
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;