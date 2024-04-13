import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getUserDetails, userProfileUpdate } from "../actions/userActions";
import Messages from "../component/Messages";
import LoadingSpinner from "../component/LoadingSpinner";
import { USER_PROFILE_UPDATE_RESET } from "../constants/userConstants";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userProfileUpdate);

  useEffect(() => {
    // if user isn't logged in, then redirect to login page
    if (!userInfo) {
      navigate("/user/login");
    } else {
      // if no user or no user name, get user details
      if (!user || !user.name || success) {
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, user, dispatch, navigate, success]);

  const handleUpdateDetails = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Password Do Not Match.");
    } else {
      dispatch(
        userProfileUpdate({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setSuccessMessage("Details Updated Successfully!");
      setErrorMessage("");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>My Profile</h2>
        <hr />
        {/* Update Success messages */}
        {successMessage && (
          <Messages variant={"success"}>{successMessage}</Messages>
        )}
        {/* Display error messages */}
        {error && <Messages variant={"danger"}>{error}</Messages>}
        {/* Display loading spinner */}
        {loading && <LoadingSpinner />}

        {/* Details Update Form */}
        <Form onSubmit={handleUpdateDetails}>
          <div className="d-grid gap-4">
            {/* Name Field */}
            <Form.Group controlId="name">
              <Form.Label style={{ fontWeight: 500, fontSize: "1rem" }}>
                name
              </Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            {/* E-mail Field */}
            <Form.Group controlId={"email"}>
              <Form.Label style={{ fontWeight: 500, fontSize: "1rem" }}>
                E-mail
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            {/* Password Field */}
            <Form.Group controlId={"password"}>
              <Form.Label style={{ fontWeight: 500, fontSize: "1rem" }}>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* Confirm Password Field */}
            <Form.Group controlId={"ConfirmPassword"}>
              <Form.Label style={{ fontWeight: 500, fontSize: "1rem" }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* error massage for password matching. */}
            {errorMessage && (
              <Messages variant={"danger"}>{errorMessage}</Messages>
            )}

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
