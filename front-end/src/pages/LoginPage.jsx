import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../component/formContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../actions/userActions";
import Messages from "./../component/Messages";
import LoadingSpinner from "../component/LoadingSpinner";

const LoginPage = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { error, loading, userInfo } = useSelector((state) => state.userLogin);

  /** if user is already logged in and user try to see login page.
   * redirect user to previous page or home page.
   */
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleUserLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className="mb-4" style={{ fontWeight: "bold", fontSize: "2.75rem" }}>
        Login
      </h1>

      {/* Display error messages */}
      {error && <Messages variant={"danger"}>{error}</Messages>}

      {/* Display loading spinner */}
      {loading && <LoadingSpinner />}

      <Form onSubmit={handleUserLogin}>
        <div className="d-grid gap-4">
          {/* E-mail Field */}
          <Form.Group controlId="email">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
              E-mail Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your E-mail"
              required
            ></Form.Control>
          </Form.Group>

          {/* Password Field */}
          <Form.Group controlId="password">
            <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              required
            ></Form.Control>
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" disabled={loading}>
            Login
          </Button>
        </div>
      </Form>

      <Row className="py-4">
        <Col>
          {"Don't have an account?"}{" "}
          <Link
            to={
              redirect
                ? `/user/register?redirect=${redirect}`
                : "/user/register"
            }
          >
            Register Now
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
