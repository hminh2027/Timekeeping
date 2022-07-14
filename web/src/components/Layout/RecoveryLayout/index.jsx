import { Image, Space } from "antd";
import style from "../../../styles/pages/account/login.module.scss";
const RecoveryLayout = (props) => {
  return (
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
        alt="Login image"
        className={style.image}
      />
      {props.children}
    </Space>
  );
};

export default RecoveryLayout;
