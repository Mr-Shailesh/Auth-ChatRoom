import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const collectRef = collection(db, "Users");

  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value });
  };

  const { email, password, name } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collectRef, {
      name: name,
      email: email,
      password: password,
    })
      .then(() => {
        console.log("Data Added Successfully !");
      })
      .catch((err) => {
        console.log(err.message);
      });
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form--all">
      <div className="p-4 box">
        <h2 className="mb-3">Chat Room</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email address"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={changeHandler}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
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

export default Signup;
