import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";

import FormContainer from "../component/formContainer";
import FormInputField from "../component/FormInputField";
import LoadingSpinner from "../component/LoadingSpinner";
import Messages from "../component/Messages";
import { register } from "../actions/userActions";

const RegisterPage = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { error, loading, userInfo } = useSelector(
    (state) => state.userRegister
  );

  /** if user is already logged in and user try to see login page.
   * redirect user to previous page or home page.
   */
  // const userInfoFromLS = localStorage.getItem("userInfo");
  // const userInfo = JSON.parse(userInfoFromLS);
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleUserRegister = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      setMessage("Password Do Not Match.");
    }
  };

  return (
    <FormContainer>
      <h1 className="mb-4" style={{ fontWeight: "bold", fontSize: "2.75rem" }}>
        Register
      </h1>

      {/* Display error messages */}
      {error && <Messages variant={"danger"}>{error}</Messages>}

      {/* Display loading spinner */}
      {loading && <LoadingSpinner />}

      <Form onSubmit={handleUserRegister}>
        <div className="d-grid gap-4">
          {/* Name Field */}
          <FormInputField
            id={"name"}
            label={"Name"}
            type={"text"}
            placeholder={"Enter Full Name"}
          ></FormInputField>

          {/* E-mail Field */}
          <FormInputField
            id={"email"}
            label={"E-mail"}
            type={"email"}
            placeholder={"Enter E-mail"}
          ></FormInputField>

          {/* Password Field */}
          <FormInputField
            id={"password"}
            label={"Password"}
            type={"password"}
            placeholder={"Enter Password"}
          ></FormInputField>

          {/* Confirm Password Field */}
          <FormInputField
            id={"confirmPassword"}
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Enter Password Again"}
          ></FormInputField>

          {/* error massage for password matching. */}
          {message && <Messages variant={"danger"}>{message}</Messages>}

          {/* Submit Button */}
          <Button variant="primary" type="submit" disabled={loading}>
            Register
          </Button>
        </div>
      </Form>

      <Row className="py-4">
        <Col>
          {"Already have an account?"}{" "}
          <Link
            to={redirect ? `/user/login?redirect=${redirect}` : "/user/login"}
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
