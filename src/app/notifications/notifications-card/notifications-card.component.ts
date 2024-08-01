import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {NotificationService} from "../notification.service";
import {Notification} from "../notification";

@Component({
  selector: 'app-notifications-page-card',
  templateUrl: './notifications-card.component.html',
  styleUrls: ['./notifications-card.component.css'],
})
export class NotificationsCardComponent {
  @Input()
  notification:Notification;
  constructor(private router: Router,private notificationService: NotificationService) {

  }
  ngOnInit(): void {
  }

  deleteNotification() {
    this.notificationService.deleteNotification(this.notification.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

}
