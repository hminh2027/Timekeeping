import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import api from "../../../../api/api";
import auth from "../../../../api/auth";
import Form from "../Common/Form";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [invalidData, setInvalidData] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const loginHandler = async () => {
    const { email, password } = data;
    console.log(emailRegex.test(email) && passwordRegex.test(password));

    if (!emailRegex.test(email) && !passwordRegex.test(password))
      return setInvalidData(true);

    try {
      const data = await api.post("auth/login", {
        email,
        password,
      });
      if (data) {
        console.log(data);
        if (data.status === 201) {
          setLoginSuccess(true);
          return auth.setToken(data.access_token);
        }
      }
    } catch (error) {
      console.log("Error while login");
      if (error.response.status === 401) {
        return setLoginFailed(true);
      }
    }
  };
  if (loginSuccess) {
    setTimeout(() => Router.push("/"), 3000);
  }
  return (
    <Form title="Login">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {loginFailed && (
          <div style={{ color: "red", fontSize: "1.1rem" }}>
            Wrong email/password !
          </div>
        )}
        {loginSuccess && (
          <div style={{ color: "rgb(108, 196, 161)", fontSize: "1.1rem" }}>
            Login successful! Redirecting...
          </div>
        )}
        {invalidData && (
          <div style={{ color: "rgb(249, 217, 35)", fontSize: "1.1rem" }}>
            Invalid Input
          </div>
        )}
        <Space>
          <UserOutlined style={{ fontSize: "1.5rem" }} />
          <Input
            placeholder="email"
            id="email"
            name="email"
            value={data.email}
            style={{
              minWidth: "20rem",
              border: "none",
              borderBottom: "1px solid rgba(230,230,230,0.5",
            }}
            size="large"
            onChange={(e) => {
              handleChange(e);
              setLoginFailed(false);
              setInvalidData(false);
            }}
            onPressEnter={() => {
              loginHandler;
            }}
          />
        </Space>
        <Space direction="vertical" size="small">
          <Space>
            <LockOutlined style={{ fontSize: "1.5rem" }} />
            <Input.Password
              placeholder="Password"
              id="password"
              name="password"
              value={data.password}
              style={{
                minWidth: "20rem",
                border: "none",
                borderBottom: "1px solid rgba(230,230,230,0.5",
              }}
              size="large"
              onChange={(e) => {
                handleChange(e);
                setLoginFailed(false);
                setInvalidData(false);
              }}
              onPressEnter={() => {
                loginHandler;
              }}
            />
          </Space>

          <Space style={{ flexDirection: "row-reverse", width: "100%" }}>
            <Link href="/account/forgot">Forgot Password?</Link>
          </Space>
        </Space>

        <Button
          type="primary"
          style={{ width: "100%", borderRadius: "6px" }}
          onClick={() => loginHandler()}
        >
          Login
        </Button>
      </Space>
    </Form>
  );
};

export default LoginForm;
const emailRegex = /^.{4,}$/;
const passwordRegex = /^.{4,}$/;
