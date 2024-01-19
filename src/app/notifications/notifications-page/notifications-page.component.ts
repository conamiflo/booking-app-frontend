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
    //   this.reviewService.getReviews().subscribe({
    //     next: (data: Review[]) =>{
    //       if (data && data.length > 0) {
    //         this.reviews = data.filter(review => review.reported || !review.approved);
    //       } else {
    //         console.log("Error.");
    //       }
    //     },
    //     error: (error: any) => {
    //       console.log("Error:", error);
    //     }
    //   })
    // }
  }
}
