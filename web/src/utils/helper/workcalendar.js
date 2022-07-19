import moment from "moment";

export const getDateArray = (ticket) => {
  const startDate = moment(ticket.content.startDate);
  const endDate = moment(ticket.content.endDate);

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
