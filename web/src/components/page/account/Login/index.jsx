import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "@/api/api";
import auth from "@/api/auth";
import { setUserInfo } from "@/redux/feature/user/userSlice";
import Form from "../Common/Form";
import { extractMessages } from "@/utils/Formatter/ApiError";
import { useLoginMutation } from "src/rest/auth/auth.query";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const { mutate: doLogin } = useLoginMutation();

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
            dispatch(setUserInfo({ userInfo: userInfo }));
            auth.setToken(res.data.accessToken);
            auth.setRefreshToken(res.data.refreshToken);
            setLoginSuccess(true);

            Router.push("/");
          }
        }
      } catch (err) {
        const messages = extractMessages(err);
        newErrors.push({
          title: "login-failed",
          message: messages.reduce(
            (message, text) => message + "\n" + text,
            ""
          ),
          color: "red",
        });
        setErrors(newErrors);
      }
    }
  };
  return (
    <Form title="Login">
      <div className="flex w-full flex-col gap-10">
        {loginSuccess && (
          <div style={{ color: "rgb(108, 196, 161)", fontSize: "1.1rem" }}>
            Login successful! Redirecting...
          </div>
        )}
        {errors && (
          <div className="flex flex-col items-start pb-4">
            {errors.map((error, i) => (
              <div key={i} style={{ color: error.color, fontWeight: "500" }}>
                {error.message}
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
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
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-full items-center gap-2">
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
          </div>

          <div className="flex w-full flex-row-reverse items-center">
            <Link href="/account/forgot">Forgot Password?</Link>
          </div>
        </div>

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
      </div>
    </Form>
  );
};

export default LoginForm;
const emailRegex = /^[\w-\.]+@(vdtsol\.)+[\w-]{2,4}$/;
// const emailRegex = /^\w+$/;

const passwordRegex = /^.{4,}$/;
// const passwordRegex = /^\w+$/;
