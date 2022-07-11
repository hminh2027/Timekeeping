import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Space, Spin } from "antd";
import { useState } from "react";
import api from "../../../../api/api";
import Form from "../Common/Form";
const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [recoverySent, setRecoverySent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const recoverHandler = async () => {
    setRecoverySent(false);
    setErrors([]);
    const newErrors = [];
    if (!usernameRegex.test(username) && !emailRegex.test(username)) {
      newErrors.push({
        title: "invalid-data",
        message: "Invalid Username (Username must be a vdtsol email)",
        color: "rgb(249, 217, 35)",
      });
    }

    try {
      setIsSubmitting(true);
      //Call API to recover account
      const res = await api.post("auth/forgot", { email: username });
      setRecoverySent(true);
    } catch (err) {
      const newErrors = errors.filter(
        (error) => error.title !== "submit-error"
      );

      newErrors.push({
        title: "submit-error",
        message: err.response.data.message,
        color: "rgb(102,128,211)",
      });
      setErrors(newErrors);
      console.log("NEw error: ", newErrors);

      // console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form title="Recover Password">
      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%", alignItems: "center" }}
      >
        {errors && (
          <Space direction="vertical">
            {errors.map((err) => (
              <span style={{ color: err.color }} className="error">
                {err.message}
              </span>
            ))}
          </Space>
        )}

        {recoverySent && (
          <div style={{ color: "rgb(108, 196, 161)", fontSize: "1.1rem" }}>
            Recovery instruction sent! Please check your email.
          </div>
        )}
        <div>Enter your ID/ Email address to recover your password!</div>
        <Space direction="vertical" size="large">
          <Space>
            <UserOutlined style={{ fontSize: "1.5rem" }} />
            <Input
              placeholder="Username/ Email address"
              id="username"
              value={username}
              style={{
                minWidth: "20rem",
                border: "none",
                borderBottom: "1px solid rgba(230,230,230,0.5",
              }}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors([]);
              }}
              size="large"
            />
          </Space>

          <Button
            type="primary"
            style={{ width: "100%", borderRadius: "6px" }}
            onClick={() => recoverHandler()}
          >
            {isSubmitting ? (
              <Space>
                <Spin indicator={<LoadingOutlined spin />} />
                <div>Submitting</div>
              </Space>
            ) : (
              "Recover"
            )}
          </Button>
        </Space>
      </Space>
    </Form>
  );
};

export default ForgotPassword;
const usernameRegex = /^.{4,}$/;
const emailRegex = /^[\w-\.]+@(vdtsol\.)+[\w-]{2,4}$/;
