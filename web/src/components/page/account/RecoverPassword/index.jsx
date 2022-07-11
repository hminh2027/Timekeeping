import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Input, Space, Spin } from "antd";
import { useState } from "react";
import api from "../../../../api/api";
import Form from "../Common/Form";
const RecoverPassword = (props) => {
  const { token } = props;
  console.log("Token ne: ", token);
  const [data, setData] = useState({ password: "", password2: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors([]);
  };
  const [errors, setErrors] = useState([]);
  const checkError = () => {
    const newErrors = [];

    if (data.password !== data.password2) {
      newErrors.push({
        title: "not-match",
        message: "Inputs not match",
        color: "rgb(239,100,97)",
      });
    }
    if (!passwordRegex.test(data.password)) {
      newErrors.push({
        title: "invalid-password",
        message: "Password must be a string and longer than or equal to 6",
        color: "rgb(249, 217, 35)",
      });
    }
    setErrors(newErrors);
    if (newErrors.length > 0) return true;
    return false;
  };
  const submit = async () => {
    if (checkError()) {
      return;
    }
    try {
      setIsSubmitting(true);

      const res = await api.post(`auth/reset?token=${token}`, { ...data });
      setIsSubmitting(false);
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
      setIsSubmitting(false);
    }
  };
  //   console.log("Error: ", errors);
  return (
    <Form title="Recover Password">
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
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
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
            onChange={handleChange}
            onPressEnter={() => {
              submit();
            }}
          />
        </Space>
        <Space direction="vertical" size="small">
          <Space>
            <LockOutlined style={{ fontSize: "1.5rem" }} />
            <Input.Password
              placeholder="Repeat Password"
              id="password2"
              name="password2"
              value={data.password2}
              style={{
                minWidth: "20rem",
                border: "none",
                borderBottom: "1px solid rgba(230,230,230,0.5",
              }}
              size="large"
              onChange={handleChange}
              onPressEnter={() => {
                submit();
              }}
            />
          </Space>
        </Space>

        <Button
          type="primary"
          style={{ width: "100%", borderRadius: "6px" }}
          onClick={() => {
            checkError();
            submit();
          }}
        >
          {isSubmitting ? (
            <Space>
              <Spin indicator={<LoadingOutlined spin />} />
              <div>Submitting</div>
            </Space>
          ) : (
            "Submit"
          )}
        </Button>
      </Space>
    </Form>
  );
};

export default RecoverPassword;
const passwordRegex = /^.{6,}$/;
