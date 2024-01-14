import {Component} from "@angular/core";
import {ReservationService} from "../../../reservation/reservation.service";
import {AuthService} from "../../../authentication/auth.service";
import {ReviewService} from "../../review.service";
import {GuestReservation} from "../../../reservation/guest-reservation/model/reservation.model";
import {Review} from "../../review";

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css'],
})
export class AdminReviewsComponent {

  reviews: Review[] = [];
  constructor(private  reviewService: ReviewService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.reviewService.getReviews().subscribe({
      next: (data: Review[]) =>{
        if (data && data.length > 0) {
          this.reviews = data.filter(review => review.reported || !review.approved);
        } else {
          console.log("Error.");
        }
      },
      error: (error: any) => {
        console.log("Error:", error);
      }
    })
  }
}
