import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";

const LoginLayout = (props) => {
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Content>{props.children} </Content>
    </Layout>
  );
};

export default LoginLayout;
