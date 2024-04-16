import FormContainer from "./../component/FormContainer";
import { Button, Form } from "react-bootstrap";
import FormInputField from "../component/FormInputField";

const ShippingAddressPage = () => {
  const handleShippingAddress = (event) => {
    event.preventDefault();

    const form = event.target;
    const address = form.address.value;
    const city = form.city.value;
    const postalCode = form.postalCode.value;
    const country = form.country.value;
  };

  return (
    <FormContainer>
      <h1>Shipping Address</h1>
      <Form onSubmit={handleShippingAddress}>
        <div className="d-grid gap-4">
          {/* Address Field */}
          <FormInputField
            id={"address"}
            label={"Address"}
            type={"text"}
            placeholder={"Full Address"}
          ></FormInputField>

          {/* City Field */}
          <FormInputField
            id={"city"}
            label={"City"}
            type={"text"}
            placeholder={"Your City"}
          ></FormInputField>

          {/* Postal Code Field */}
          <FormInputField
            id={"postalCode"}
            label={"Postal Code"}
            type={"text"}
            placeholder={"Postal Code"}
          ></FormInputField>

          {/* Country Field */}
          <FormInputField
            id={"country"}
            label={"Country"}
            type={"text"}
            placeholder={"Country Name"}
          ></FormInputField>

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
