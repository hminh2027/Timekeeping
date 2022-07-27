import api from "@/api/api";
import { UserInfoFormatter } from "@/utils/Formatter/UserInfo";

const getUsers = async (sortOptions) => {
  const userSortOptions = sortOptions || "undefined";
  const url = `user?${userSortOptions}`;
  const res = await api.get(url);
  const resUser = res.data.map((user) => UserInfoFormatter(user));
  return resUser;
};

export { getUsers };
