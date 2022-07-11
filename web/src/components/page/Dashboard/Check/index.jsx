import { useSelector } from "react-redux";
import {
  selectUserCheckInStatus,
  selectUserCheckOutStatus,
} from "../../../../redux/feature/user/userSlice";
// import ad
const Check = () => {
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const checkOutStatus = useSelector(selectUserCheckOutStatus);

  //   const content =
  return <div>Check</div>;
};

export default Check;
