import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { sendPasswordResetEmail } = useUserAuth();
  let navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(email);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form--all">
      <div className="p-4 box">
        <h2 className="mb-3">Forget Password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handlePasswordReset}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Send Link
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
