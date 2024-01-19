import {Component} from "@angular/core";
import {NotificationService} from "../notification.service";
import {AuthService} from "../../authentication/auth.service";
import {Notification} from "../notification";

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css'],
})
export class NotificationsPageComponent {

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService, private authService: AuthService) {
  }

  ngOnInit(): void {
      this.notificationService.getUsersNotifications(this.authService.getUsername()).subscribe({
        next: (data: Notification[]) =>{
          if (data && data.length > 0) {
            this.notifications = data;
          } else {
            console.log("Error.");
          }
        },
        error: (error: any) => {
          console.log("Error:", error);
        }
      });
    }

}
