import { Image, Space } from "antd";
import { useLayoutEffect, useState } from "react";
import style from "@/styles/pages/account/login.module.scss";
import auth from "@/api/auth";
import { fetchMe } from "@/redux/feature/user/userSlice";
import { useDispatch } from "react-redux";
import Router from "next/router";
const RecoveryLayout = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    setLoading(true);
    // const authed = auth.checkAuth();
    // if (authed) {
    //   Router.push("/dashboard");
    // }
    const getUserInfo = () => {
      const res = dispatch(fetchMe());
      console.log(res);
      if (res !== null) {
        Router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };
    getUserInfo();
  }, []);
  const content = (
    <Space
      style={{
        width: "100%",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "1em",
      }}
      className={style.loginPage}
    >
      <Image
        src="https://img.freepik.com/free-vector/tiny-people-protecting-business-data-legal-information-isolated-flat-illustration_74855-11121.jpg"
        preview={false}
        alt="image"
        className={style.image}
      />
      {props.children}
    </Space>
  );
  return loading ? <></> : content;
};

export default RecoveryLayout;
