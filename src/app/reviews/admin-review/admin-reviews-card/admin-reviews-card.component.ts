import {Component, Input} from "@angular/core";
import {Review} from "../../review";
import {Router} from "@angular/router";
import {ReviewService} from "../../review.service";

@Component({
  selector: 'app-admin-reviews-card',
  templateUrl: './admin-reviews-card.component.html',
  styleUrls: ['./admin-reviews-card.component.css'],
})
export class AdminReviewsCardComponent {
  @Input()
  review:Review;
  reviewType: String;
  reported: boolean = false;
  constructor(private router: Router,private reviewService: ReviewService) {

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
}
