import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import FormContainer from "./../component/FormContainer";
import CheckoutSteps from "../component/CheckoutSteps";

import { orderPaymentMethod } from "../actions/cartAction";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!shippingAddress.address) {
    navigate("/shipping-address");
  }

  const paymentMethodHandler = (event) => {
    event.preventDefault();
    dispatch(orderPaymentMethod(paymentMethod));
    navigate("/confirm-order");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1 className="mb-5">Select Payment Method</h1>

      <Form onSubmit={paymentMethodHandler}>
        {/* Select Payment Method */}
        <Form.Group controlId="payment">
          {/* <Form.Label
            as="legend"
            style={{ fontWeight: 500, fontSize: "1.1rem" }}
          >
            Select Payment Method
          </Form.Label> */}
          <Form.Check
            className="mb-4"
            type="radio"
            label="PayPal or Credit Card"
            id="paypal"
            name="paymentMethod"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
