import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import FormContainer from "./../component/FormContainer";
import FormInputField from "../component/FormInputField";
import { orderShippingAddress } from "./../actions/cartAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ShippingAddressPage = () => {
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);
  console.log(shippingAddress);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const handleShippingAddress = (event) => {
    event.preventDefault();

    // const form = event.target;
    // const address = form.address.value;
    // const city = form.city.value;
    // const postalCode = form.postalCode.value;
    // const country = form.country.value;

    dispatch(orderShippingAddress({ address, city, postalCode, country }));
    navigate("/");
  };

  return (
    <FormContainer>
      <h1>Shipping Address</h1>
      <Form onSubmit={handleShippingAddress}>
        <div className="d-grid gap-4">
          {/* Address Field */}
          <Form.Group controlId="address">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
              Address
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Address"
              required
              value={address ? address : ""}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* City Field */}
          <Form.Group controlId="city">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
              City
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Your City"
              required
              value={city ? city : ""}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Postal Code Field */}
          <Form.Group controlId="postalCode">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
              Postal Code
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Postal Code"
              required
              value={postalCode ? postalCode : ""}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Country Field */}
          <Form.Group controlId="country">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
              Country
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Country Name"
              required
              value={country ? country : ""}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
        {/* onchange={(e) => setAddress(e.target.value)} */}
      </Form>
    </FormContainer>
  );
};

export default ShippingAddressPage;
