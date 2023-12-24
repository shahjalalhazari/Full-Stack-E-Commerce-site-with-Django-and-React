import Product from "../component/Product";
import products from "../products"
import { Col, Row } from 'react-bootstrap';

const Home = () => {
    return (
      <div>
        <h1>Latest Products</h1>
        <div className="mt-3">
          <Row>
            {
              products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="g-4">
                  <Product product={product}/>
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    );
};

export default Home;