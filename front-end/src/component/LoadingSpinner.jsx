import { Spinner } from "react-bootstrap";


const LoadingSpinner = () => {
    return <Spinner
      animation="border"
      role="stats"
      style={{
        height: "75px",
        width: "75px",
        margin: "auto",
        display: "block"
      }}
    >
        <span className="sr-on">.</span>
    </Spinner>;
};

export default LoadingSpinner;