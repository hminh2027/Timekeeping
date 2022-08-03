import { BaseService } from "../base-service";

class Notification extends BaseService {
    getMyNotification() {
        return this.http.get(`${this.basePath}`).then((res) => res.data)
    }

}

export const NotificationService = new Notification("notification");