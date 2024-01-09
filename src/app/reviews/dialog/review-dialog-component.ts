import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MaterialModule} from "../../material.module";
import {AccommodationFilterModel} from "../../accommodation/model/accommodation-filter.model";
import {ReviewDialogModel} from "../review.dialog";
import {ReviewService} from "../review.service";
import {Review} from "../review";
import {AuthService} from "../../authentication/auth.service";
import {Amenity} from "../../accommodation/accommodation-creation/model/amenity.model";

@Component({
  selector: 'app-owner-review-dialog',
  templateUrl: './review-dialog-component.html',
  styleUrls: ['./review-dialog-component.css'],
  standalone: true,
  imports: [MatSliderModule, MatInputModule, FormsModule, MatDialogModule, MatSelectModule, NgForOf, MaterialModule],
})
export class ReviewDialogComponent {

  rating: number = 0;
  reviewText: string = '';
  accommodationId: number;
  ownerEmail: string;
  reviewType: string;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewDialogModel,
    private reviewService: ReviewService, private authService: AuthService
  ) {
    this.accommodationId = data.accommodationId;
    this.ownerEmail = data.ownerEmail;
    this.reviewType = data.reviewType;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createReview() : Review{
    return  {
      id: 0,
      guestEmail: this.authService.getUsername(),
      rating: this.rating,
      description: this.reviewText,
      date: Math.round((new Date()).getTime() / 1000),
      reported: false,
      ownerEmail: this.ownerEmail,
      accommodationId: this.accommodationId,
      approved: false
    };
  }
  submitReview(): void {
    console.log(this.createReview());
    this.reviewService.createReview(this.createReview()).subscribe({
      next: (data: Review) => {
        this.dialogRef.close();
        alert(`Successfully sent a ${this.reviewType} review request! `)
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }
}
