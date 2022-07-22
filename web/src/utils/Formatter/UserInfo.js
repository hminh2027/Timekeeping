
const UserInfoFormatter = (user) => {
  return {
    id: user.id,
    content: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  };
};
export { UserInfoFormatter };
