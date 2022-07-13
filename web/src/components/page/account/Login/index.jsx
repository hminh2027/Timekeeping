import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../../../api/api";
import auth from "../../../../api/auth";
import { setUserInfo } from "../../../../redux/feature/user/userSlice";
import Form from "../Common/Form";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors([]);
  };
  const loginHandler = async () => {
    const { email, password } = data;

    const newErrors = [];
    if (!emailRegex.test(email)) {
      newErrors.push({
        title: "invalid-inputs",
        message: "Invalid Email",
        color: "rgb(249, 217, 35)",
      });
      setErrors(newErrors);
      return;
    }
    if (!passwordRegex.test(password)) {
      newErrors.push({
        title: "invalid-inputs",
        message: "Invalid Password",
        color: "rgb(249, 217, 35)",
      });
      setErrors(newErrors);
      return;
    }
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      try {
        const res = await api.post("auth/login", { email, password });

        if (res) {
          if (res.status === 201) {
            const { user: userInfo } = res.data;
            console.log(userInfo);
            dispatch(setUserInfo({ userInfo: userInfo }));
            await auth.setToken(res.data.accessToken);
            setLoginSuccess(true);

            setTimeout(() => Router.push("/"), 3000);
          }
        }
      } catch (err) {
        console.log(err);
        newErrors.push({
          title: "login-failed",
          message: err.response.data.message,
          color: "red",
        });
        setErrors(newErrors);
      } finally {
      }
    }
  };
  return (
    <Form title="Login">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {loginSuccess && (
          <div style={{ color: "rgb(108, 196, 161)", fontSize: "1.1rem" }}>
            Login successful! Redirecting...
          </div>
        )}
        {errors && (
          <Space
            direction="vertical"
            style={{ width: "100%", paddingBottom: "1em" }}
          >
            {errors.map((error, i) => (
              <div style={{ color: error.color, fontWeight: "500" }}>
                {error.message}
              </div>
            ))}
          </Space>
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
            }}
            onPressEnter={() => {
              loginHandler();
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
              }}
              onPressEnter={() => {
                loginHandler();
              }}
            />
          </Space>

          <Space style={{ flexDirection: "row-reverse", width: "100%" }}>
            <Link href="/account/forgot">Forgot Password?</Link>
          </Space>
        </Space>

        <button
          className="v-btn-primary w-full"
          // style={{ width: "100%", borderRadius: "6px" }}
          onClick={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          Login
        </button>
      </Space>
    </Form>
  );
};

export default LoginForm;
const emailRegex = /^[\w-\.]+@(vdtsol\.)+[\w-]{2,4}$/;

const passwordRegex = /^.{4,}$/;
