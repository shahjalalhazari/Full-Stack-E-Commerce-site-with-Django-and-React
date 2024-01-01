import { useEffect, useState } from "react";
import Product from "../component/Product";
import { Col, Row } from 'react-bootstrap';
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      const { data } = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(data);
    };

    fetchProducts();
    
  }, [])

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