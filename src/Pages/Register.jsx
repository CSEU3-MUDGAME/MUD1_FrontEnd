import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "../utils/hooks";
import { register } from "../state/actions/user";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Register = ({ register, history }) => {
  const { onChange, onSubmit, values } = useForm(handleSubmit, {
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    await register(
      values.username,
      values.password,
      values.confirmPassword,
      history
    );
  }
  return (
    <Div>
      <Form onSubmit={onSubmit}>
        <div style={{ marginTop: "10px" }}>
          <Label>Username</Label>
          <br />
          <Input
            type="text"
            value={values.username}
            name="username"
            onChange={onChange}
            required
          />
        </div>
        <div style={{ marginTop: "30px" }}>
          <Label>Password</Label>
          <br />
          <Input
            type="password"
            value={values.password}
            name="password"
            onChange={onChange}
            required
          />
        </div>
        <div style={{ marginTop: "30px" }}>
          <Label>Confirm Password</Label>
          <br />
          <Input
            type="password"
            value={values.confirmPassword}
            name="confirmPassword"
            onChange={onChange}
            required
          />
        </div>
        <Button
          type="submit"
          value={loading ? "Loading..." : "Register"}
          disabled={loading}
        />
      </Form>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 80%;
`;

const Label = styled.label`
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: white;
  font-weight: bold;
`;
const Input = styled.input`
  width: 100%;
  border: 2px solid grey;
  height: 40px;
  border-radius: 10px;
  background-color: #333;
  margin-top: 10px;
  color: white;
  padding: 10px;
  font-size: 20px;
`;

const Button = styled.input`
  width: 100%;
  height: 40px;
  background-color: #6df7b1;
  font-family: "Oxanium", cursive;
  font-size: 20px;
  color: #333;
  border: none;
  cursor: pointer;
  margin-top: 50px;
  border-radius: 10px;
  transition: 0.5s opacity ease-in-out;
  font-weight: bold;

  &:hover {
    opacity: 0.7;
  }
`;
export default withRouter(connect(null, { register })(Register));
