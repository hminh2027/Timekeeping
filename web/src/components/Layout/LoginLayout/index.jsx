import { Image, Space } from "antd";
import { useState, useEffect } from "react";
import { fetchMe } from "@/redux/feature/user/userSlice";
import { useDispatch } from "react-redux";
import style from "@/styles/pages/account/login.module.scss";
import Router from "next/router";
const LoginLayout = (props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
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
    <div className="flex w-full min-h-screen justify-center items-center px-1">
      <Image
        src="https://img.freepik.com/free-vector/construction-mobile-application-interface-ui-ux-mobile-app-vector-illustration_143808-1149.jpg"
        preview={false}
        alt="Login image"
        className={style.image}
      />
      {props.children}
    </div>
  );
  return loading ? <></> : content;
};

export default LoginLayout;
