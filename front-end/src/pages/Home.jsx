import { useEffect } from "react";
import Product from "../component/Product";
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import listProducts from "../actions/productAction";

const Home = () => {
  // const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());


    /** 
    const fetchProducts = async() => {
      const { data } = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(data);
    };
    fetchProducts();
    */
  }, [dispatch])

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