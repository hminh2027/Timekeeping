import { Image } from "antd";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchMe } from "@/redux/feature/user/userSlice";
import { useDispatch } from "react-redux";
import Router from "next/router";
// import { get } from "immer/dist/internal";
const LoginLayout = (props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const getInfo = useLayoutEffect(() => {
  //   const getUserInfo = () => {
  //     try {
  //       const res = dispatch(fetchMe());
  //       if (res !== null) {
  //         Router.push("/dashboard");
  //       } else {
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   // getUserInfo();
  // }, []);

  const content = (
    <div className="flex min-h-screen w-full flex-wrap items-center justify-center px-1">
      <Image
        src="https://img.freepik.com/free-vector/construction-mobile-application-interface-ui-ux-mobile-app-vector-illustration_143808-1149.jpg"
        preview={false}
        alt="Login image"
        className="lg:border-r-2 lg:border-solid lg:border-r-gray-100"
      />

      {props.children}
    </div>
  );
  return content;
  // loading ? <></> :
};

export default LoginLayout;
