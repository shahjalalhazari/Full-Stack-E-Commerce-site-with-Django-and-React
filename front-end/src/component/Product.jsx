/* eslint-disable react/prop-types */
import { Button, Card } from 'react-bootstrap';
import ProductRating from './ProductRating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const { _id, image, name, price, numReviews, rating } = product;

    return (
      <Card>
        <Link to={`/product/${_id}`}>
          <Card.Img variant="top" src={image} />
        </Link>
        <Card.Body className='m-1'>
          <Link to={`/product/${_id}`}>
            <Card.Title as={  "div"}>
              <strong>{name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as={"div"}>
            <div className="my-3">
              <ProductRating value={rating} text={`${numReviews} Reviews`} />
            </div>
          </Card.Text>

          <Card.Text as={"h3"}>
            <div className="my-3">
              ${price}
            </div>
          </Card.Text>
          <Button variant="primary">Add To Cart</Button>
        </Card.Body>
      </Card>
    );
};

export default Product;