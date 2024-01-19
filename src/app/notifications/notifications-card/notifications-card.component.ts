import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {NotificationService} from "../notification.service";

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

  deleteReview() {
  //   this.reviewService.deleteReview(this.review.id).subscribe({
  //     next: () => {
  //       window.location.reload();
  //     },
  //     error: (_) => {
  //       console.log("Error!")
  //     }
  //   })
  // }
  }

}
