/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

const FormInputField = ({id, label, type, placeholder }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
        {label}
      </Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        required
      ></Form.Control>
    </Form.Group>
  );
};

export default FormInputField;
