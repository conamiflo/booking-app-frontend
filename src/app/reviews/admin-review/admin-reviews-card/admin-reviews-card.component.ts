import {Component, Input} from "@angular/core";
import {Review} from "../../review";
import {Router} from "@angular/router";
import {ReviewService} from "../../review.service";
import {AccommodationService} from "../../../accommodation/accommodation.service";
import {AccommodationDetails} from "../../../accommodation/accommodation-creation/model/accomodationDetails.model";
import {Notification} from "../../../notifications/notification";
import {NotificationType} from "../../../notifications/notification.type";
import {NotificationService} from "../../../notifications/notification.service";

@Component({
  selector: 'app-notifications-page-card',
  templateUrl: './admin-reviews-card.component.html',
  styleUrls: ['./admin-reviews-card.component.css'],
})
export class AdminReviewsCardComponent {
  @Input()
  review:Review;
  reviewType: String;
  reported: boolean = false;
  constructor(private router: Router,private reviewService: ReviewService, private accommodationService: AccommodationService,
              private notificationService : NotificationService) {
  }

  ngOnInit(): void {
    if(this.review.ownerEmail != null){
      this.reviewType = "owner: " + this.review.ownerEmail;
    }else {
      this.reviewType = "Accommodation id: " + this.review.accommodationId.toString();
    }
  }

  approveReview() {
    this.review.reported = false;
    this.review.approved = true;
    this.reviewService.updateReview(this.review.id, this.review).subscribe({
      next: () => {
        window.location.reload();
        this.sendNotification(this.review);
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

  deleteReview() {
    this.reviewService.deleteReview(this.review.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

  sendNotification(review : Review){
    if(review.ownerEmail = ""){
      this.accommodationService.getAccommodationById(review.accommodationId).subscribe({
        next: (data: AccommodationDetails) => {
          this.createAccommodationReviewNotification(review,data.ownerEmail)
        }
      })
    }else{
      this.createOwnerReviewNotification(this.review);
    }
  }

  createAccommodationReviewNotification(review: Review, ownerEmail : string){
    const notification: Notification = {
      id: 1,
      message: `${review.guestEmail} has reviewed your accommodation ${review.accommodationId}`,
      receiverEmail: ownerEmail,
      type: NotificationType.RATING_ACCOMMODATIONS
    };
    this.notificationService.createNotification(notification).subscribe({
      next: (data: Notification) => {
      },
      error:(_) =>{
      }
    });
  }

  createOwnerReviewNotification(review: Review){
    const notification: Notification = {
      id: 1,
      message: `${review.guestEmail} has reviewed you!`,
      receiverEmail: review.ownerEmail,
      type: NotificationType.RATING_OWNER
    };
    this.notificationService.createNotification(notification).subscribe({
      next: (data: Notification) => {
      },
      error:(_) =>{
      }
    });
  }

}
