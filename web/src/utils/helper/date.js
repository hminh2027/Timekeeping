import moment from "moment";
const generateDateArray = (startDate, endDate) => {
  const startDateMoment = moment(startDate);
  const endDateMoment = moment(endDate);
  const diff = endDateMoment.diff(startDateMoment, "days");
  // console.log(diff);
  const res = [];
  const start = startDateMoment.date();
  console.log(start);
  for (let i = 0; i < diff; i++) {
    res.push(start + i);
  }
  return res;
};

// console.log(
//   generateDateArray("2022-07-31T17:00:00.000Z", "2022-08-03T17:00:00.000Z")
// );
