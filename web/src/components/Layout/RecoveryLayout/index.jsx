import { Image } from "antd";
import { useEffect, useState } from "react";
import { fetchMe } from "@/redux/feature/user/userSlice";
import { useDispatch } from "react-redux";
import Router from "next/router";
const RecoveryLayout = (props) => {
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
    <div className="flex w-full min-h-screen justify-center items-center px-1 flex-wrap">
      <Image
        src="https://img.freepik.com/free-vector/tiny-people-protecting-business-data-legal-information-isolated-flat-illustration_74855-11121.jpg"
        preview={false}
        alt="image"
        className="lg:border-solid lg:border-r-2 lg:border-r-gray-100"
      />
      {props.children}
    </div>
  );
  return loading ? <></> : content;
};

export default RecoveryLayout;
