import { Button, Col, Row } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserCheckInStatus } from "../../../../redux/feature/user/userSlice";
import styles from "../../../../styles/pages/dashboard/home.module.scss";
import Card from "../../../Common/Card";
import WorkCalendar from "./WorkCalendar";
const Home = () => {
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const notCheckedContent = (
    <>
      <div>Let's get to work!✨✨</div>
      <Link href="/dashboard/checkin">
        <Button type="primary" className={styles.button}>
          Check In ✔
        </Button>
      </Link>
    </>
  );
  const checkInContent = (
    <>
      <div>Already Checked In!✨✨</div>
      {/* <Link href="/dashboard/checkin">
        <Button type="primary" className={styles.button}>
          Check In ✔
        </Button>
      </Link> */}
    </>
  );
  return (
    <>
      <Row style={{ padding: "1em " }} gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={8}>
          <Card>
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "1em",
              }}
            >
              {checkInStatus ? checkInContent : notCheckedContent}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          <Card style={{ width: "100%", height: "400px" }}>
            <WorkCalendar />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
