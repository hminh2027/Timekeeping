import { Image, Space } from "antd";
import style from "../../../styles/pages/account/login.module.scss";
const LoginLayout = (props) => {
  return (
    <Space
      style={{
        width: "100%",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 1rem",
      }}
      className={style.loginPage}
    >
      <Image
        src="https://img.freepik.com/free-vector/construction-mobile-application-interface-ui-ux-mobile-app-vector-illustration_143808-1149.jpg"
        preview={false}
        alt="Login image"
        className={style.image}
      />
      {props.children}
    </Space>
  );
};

export default LoginLayout;
