import { Button, Col, Row } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserCheckInStatus } from "../../../../redux/feature/user/userSlice";
import styles from "../../../../styles/pages/dashboard/home.module.scss";
import ReactCalendar from "./ReactCalendar";

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
      <div>Already Checked In!🔥🔥🔥</div>
    </>
  );
  return (
    <>
      <Row style={{ padding: "1em " }} gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={8}>
          <div className="card ">
            <div className="card-body">
              {checkInStatus ? checkInContent : notCheckedContent}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          <div className="card w-full">
            <div className="card-body">
              {/* <WorkCalendar /> */}
              <ReactCalendar />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Home;
