import { UserOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useState } from "react";
import Form from "../Common/Form";
const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [invalidData, setInvalidData] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const recoverHandler = () => {
    if (!usernameRegex.test(username) && !emailRegex.test(username)) {
      return setInvalidData(true);
    }
    try {
      //Call API to recover account
      setRecoverySent(true);
    } catch (err) {}
  };
  return (
    <Form title="Recover Password">
      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%", alignItems: "center" }}
      >
        {invalidData && (
          <div style={{ color: "rgb(249, 217, 35)", fontSize: "1.1rem" }}>
            Invalid Input
          </div>
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
                setInvalidData(false);
              }}
              size="large"
            />
          </Space>

          <Button
            type="primary"
            style={{ width: "100%", borderRadius: "6px" }}
            onClick={() => recoverHandler()}
          >
            Recover
          </Button>
        </Space>
      </Space>
    </Form>
  );
};

export default ForgotPassword;
const usernameRegex = /^.{4,}$/;
const emailRegex = /^\S+@\S+\.\S+$/;
