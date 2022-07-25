// import {CheckinResponse} from './checkin.query';
// import {CheckinService, InputCheckin} from './checkin.service';
// import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

// export interface CheckinResponse {
//   id: number;
//   checkinImage: string;
//   checkoutImage: string;
//   checkinLongitude: string;
//   checkinLatitude: string;
//   checkoutLongitude: string;
//   checkoutLatitude: string;
//   date: number;
//   createdAt: string;
//   updatedAt: string;
//   userId: number;
// }

// export const useCheckinQuery = () => {
//   return useQuery<CheckinResponse[], Error>(['checkin'], () => {
//     return CheckinService.getCheckin();
//   });
// };

// export const useCheckinMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation((input: InputCheckin) =>
//     CheckinService.createCheckin(input),
//   );
// };

// export const useCheckinTodayQuery = () => {
//   return useQuery<CheckinResponse[], Error>(['checkin-today'], () => {
//     return CheckinService.getTodayCheckin();
//   });
// };
// export const useCheckoutMutation = () => {
//   return useMutation((input: InputCheckin) =>
//     CheckinService.createCheckout(input),
//   );
// };
