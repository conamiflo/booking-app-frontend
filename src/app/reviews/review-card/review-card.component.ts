import {Component, EventEmitter, Input, Output} from '@angular/core';

import {environment} from "../../../env/env";
import {Router} from "@angular/router";
import {Review} from "../review";
import {AuthService} from "../../authentication/auth.service";
import {ReviewService} from "../review.service";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input()
  review: Review | null;
  @Input()
  ownerOfAccommodation: string;

  showReportIcon: boolean = false;
  showDeleteIcon: boolean = false;
  creationDate: string;
  constructor(private router:Router, private authService : AuthService, private reviewService : ReviewService,
              public dialog: MatDialog) {}
  ngOnInit() {
    if(this.review){
      if(this.authService.getUsername() === this.ownerOfAccommodation){
        this.showReportIcon = true;
      }
      if(this.authService.getUsername() === this.review.guestEmail){
        this.showDeleteIcon = true;
      }
      this.creationDate = new Date(this.review.date * 1000).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  }
  deleteReview(){
    const confirmed = confirm('Are you sure that you want to delete your review? ');
    if (confirmed && this.review) {
      this.reviewService.deleteReview(this.review.id).subscribe(
          () => {
            alert(`Successfully deleted your review.`);
            this.review = null;
          },
          (error) => {
          }
      );
    }
  }

  reportReview() {
    if(this.review && this.review.reported){
      alert("This review has already been reported! ");
      return;
    }
    const confirmed = confirm('Are you sure that you want to report this review? ');
    if (confirmed && this.review) {
      this.review.reported = true;
      this.reviewService.updateReview(this.review.id,this.review).subscribe(
        () => {
          alert(`Successfully reported review.`);
        },
        (error) => {
        }
      );
    }
  }
  protected readonly environment = environment;
}

