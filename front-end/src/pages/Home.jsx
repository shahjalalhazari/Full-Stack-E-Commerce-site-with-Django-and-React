import { useEffect } from "react";
import Product from "../component/Product";
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import listProducts from "../actions/productAction";
import Messages from "../component/Messages";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch])

    return (
      <div>
        <h1>Latest Products</h1>
        <div className="mt-3">
          {loading ? (
            <h3>Loading...</h3>
          ) : error ? (
            <Messages variant="warning">{error}</Messages>
          ) : (
            <Row>
              {products.map((product) => (
                <Col
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="g-4"
                >
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    );
};

export default Home;