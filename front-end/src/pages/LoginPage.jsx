import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../component/formContainer";

const LoginPage = () => {
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");

  const handleUserLogin = () => {};

  return (
    <FormContainer>
      <h1 className="mb-4" style={{ fontWeight: "bold", fontSize: "2.75rem" }}>
        Login
      </h1>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
