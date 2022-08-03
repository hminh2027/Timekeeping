import { useMutation, useQuery } from "@tanstack/react-query";
import { NotificationService } from "./notification.service";

export const useGetMeNotificationQuery = () => {
    return useQuery(["get-notification"] , () => {
        return NotificationService.getMyNotification();
    })
}
