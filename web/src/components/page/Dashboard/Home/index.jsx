import { Button, Calendar, Col, Row } from "antd";
import styles from "../../../../styles/pages/dashboard/home.module.scss";
import Card from "../../../Common/Card";
const Home = () => {
  return (
    <>
      <Row style={{ padding: "1em " }} gutter={[16, 16]}>
        <Col sm={24} md={8} lg={8}>
          <Card>
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "1em",
              }}
            >
              <div>Let's get to work!✨✨</div>
              <Button type="primary" className={styles.button}>
                Clock In ✔
              </Button>
            </div>
          </Card>
        </Col>
        <Col sm={24} md={16} lg={16}>
          <Card style={{ width: "100%", height: "400px" }}>
            <Calendar fullscreen={false} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
