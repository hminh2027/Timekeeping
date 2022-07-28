import { useMutation, useQuery } from "@tanstack/react-query";

import { USER_CHECKOUT } from "@/utils/constants/react-query";
import { CheckOutService } from "./checkout.service";

export const useGetCheckOutQuery = () => {
  return useQuery([USER_CHECKOUT.CHECKOUT], CheckinService.getCheckIn());
};

export const usePostCheckOutMutation = () => {
  return useMutation((data) => CheckOutService.postCheckOut(data));
};
