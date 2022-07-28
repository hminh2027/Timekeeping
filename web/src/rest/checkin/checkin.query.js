import { useMutation, useQuery } from "@tanstack/react-query";

import { USER_CHECKIN } from "@/utils/constants/react-query";
import { CheckinService } from "./checkin.service";

export const useGetCheckInQuery = () => {
  return useQuery([USER_CHECKIN.CHECKIN], CheckinService.getCheckIn());
};

export const usePostCheckInMutation = () => {
  return useMutation((data) => CheckinService.postCheckIn(data));
};
