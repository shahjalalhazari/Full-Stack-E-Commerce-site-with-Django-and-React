/* eslint-disable react/prop-types */
import Rating from "react-rating";


const ProductRating = ({value, text}) => {
    return (
      <div>
        <span style={{color: "#f8e825"}}>
          <Rating
            readonly
            placeholderRating={value}
            emptySymbol={<i className="fa-regular fa-star" />}
            placeholderSymbol={<i className="fas fa-star" />}
            fullSymbol={<i className="fas fa-star" />}
          />
        </span>
        <span>{text}</span>
      </div>
    );
};

export default ProductRating;