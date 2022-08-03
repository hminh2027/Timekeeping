import moment from "moment";

export const UserInfoFormatter = (user) => {
  const createdAt = moment(user.createdAt).format("DD-MM-YYYY");

  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    createdAt,
  };
};
