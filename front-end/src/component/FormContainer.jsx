/* eslint-disable react/prop-types */
import { Col, Container, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-ms-center text-center">
        <Col md={3}></Col>
        <Col xs={12} md={6}>
          {children}
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
