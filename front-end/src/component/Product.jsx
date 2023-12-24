/* eslint-disable react/prop-types */
import { Button, Card } from 'react-bootstrap';

const Product = ({ product }) => {
  const { _id, image, name, price, numReviews, rating } = product;

    return (
      <Card style={{ width: "18rem" }}>
        <a href={`/product/${_id}`}>
          <Card.Img variant="top" src={image} />
        </a>
        <Card.Body className='m-1'>
          <a href={`/product/${_id}`}>
            <Card.Title as={  "div"}>
              <strong>{name}</strong>
            </Card.Title>
          </a>

          <Card.Text as={"div"}>
            <div className="my-3">
              <em style={{color: "#111"}}>
                {rating} from {numReviews} Reviews
              </em>
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