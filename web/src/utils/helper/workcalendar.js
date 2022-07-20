import moment from "moment";

export const getDateArray = (ticket) => {
  const startDate = moment(ticket.content.startDate).subtract(1, "d");
  const endDate = moment(ticket.content.endDate).add(1, "d");

  const diff = endDate.diff(startDate, "days");
  const res = [];
  for (let i = 0; i < diff; i++) {
    res.push(new Date(startDate.add(i, "days").utc()).toISOString());
  }
  return res;
};

export const convertCheckInListToArray = (checkInList) => {
  const accepted = [],
    denied = [];
  checkInList.map((checkInItem) => {
    if (checkInItem.checkinImage && checkInItem.checkoutImage)
      accepted.push(checkInItem.createdAt);
    else if (checkInItem.checkinImage && !checkInItem.checkoutImage)
      denied.push(checkInItem.createdAt);
  });
  return { accepted, denied };
};
