import {NotificationType} from "./notification.type";

export interface Notification {
  id : number,
  receiverEmail : string,
  type : NotificationType,
  message : string,
}
