import moment from "moment";
const checkInInfoFormatter = (info) => {
  console.log(info);
  const checkInTime = moment(info.createdAt).format("YYYY-MM-DD HH:mm:ss");
  const checkOutTime = moment(info.updatedAt).format("YYYY-MM-DD HH:mm:ss");
  const actions = [];
  if (info.status === "pending") {
    actions.push();
  }
  return {
    id: info.id,
    checkInLatitude: info.checkinLatitude,
    checkInLongitude: info.checkinLongitude,
    checkOutImage: info.checkoutImage,
    checkInImage: info.checkinImage,
    checkOutLatitude: info.checkoutLatitude,
    checkOutLongitude: info.checkoutLongitude,
    checkInTime,
    checkOutTime,
    userId: info.userId,
  };
};
export { checkInInfoFormatter };
