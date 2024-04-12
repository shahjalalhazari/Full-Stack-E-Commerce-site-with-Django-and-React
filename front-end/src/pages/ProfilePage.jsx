import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";

// import FormInputField from "../component/FormInputField";
// import LoadingSpinner from "../component/LoadingSpinner";
import Messages from "../component/Messages";
import { getUserDetails } from "../actions/userActions";
import LoadingSpinner from "../component/LoadingSpinner";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    // if user isn't logged in, then redirect to login page
    if (!userInfo) {
      navigate("/user/login");
    } else {
      // if no user or no user name, get user details
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, user, dispatch, navigate]);

  const handleUpdateDetails = (event) => {
    event.preventDefault();

    // const form = event.target;
    // const name = form.name.value;
    // const email = form.email.value;
    // const password = form.password.value;
    // const confirmPassword = form.confirmPassword.value;

    // if (password !== confirmPassword) {
    //   setMessage("Password Do Not Match.");
    // } else {
    //   console.log("Updating...");
    // }
    console.log("Form Submitted...");
  };

  return (
    <Row>
      <Col md={3}>
        <h2>My Profile</h2>
        <hr />
        {/* Display error messages */}
        {error && <Messages variant={"danger"}>{error}</Messages>}

        {/* Display loading spinner */}
        {loading && <LoadingSpinner />}

        {/* Details Update Form */}
        <Form onSubmit={handleUpdateDetails}>
          <div className="d-grid gap-4">
            {/* Name Field */}
            <Form.Group controlId="name">
              <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                name
              </Form.Label>
              <Form.Control type="text" value={name}></Form.Control>
            </Form.Group>

            {/* E-mail Field */}
            <Form.Group controlId={"email"}>
              <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                E-mail
              </Form.Label>
              <Form.Control type="email" value={email}></Form.Control>
            </Form.Group>

            {/* Password Field */}
            <Form.Group controlId={"password"}>
              <Form.Label style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                Password
              </Form.Label>
              <Form.Control type="password"></Form.Control>
            </Form.Group>

            {/* error massage for password matching. */}
            {message && <Messages variant={"danger"}>{message}</Messages>}

            {/* Submit Button */}
            <Button variant="primary" type="submit" disabled={loading}>
              Update
            </Button>
          </div>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfilePage;
