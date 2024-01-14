import { Component } from '@angular/core';
import {Accommodation} from "../model/accommodation.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {MapService} from "../../shared/map/map.service";
import {MatDialog} from "@angular/material/dialog";
import * as L from "leaflet";
import {MapComponent} from "../../shared/map/map.component";
import {DatePipe} from "@angular/common";
import {ReservationBookingDtoModel} from "../model/reservation-booking-dto.model";
import {AuthService} from "../../authentication/auth.service";
import {ReservationBookingResultDTO} from "../model/reservation-booking-result-dto.model";
import {AccommodationWithAmenities} from "../model/accommodation-with-amenities.model";
import {Availability} from "../model/availability.model";
import {environment} from "../../../env/env";
import {NgbCarousel} from "@ng-bootstrap/ng-bootstrap";
import {NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {DialogAccommodationFilterComponent} from "../dialog-accommodation-filter/dialog-accommodation-filter.component";
import {ReviewDialogComponent} from "../../reviews/dialog/review-dialog-component";
import {ReviewService} from "../../reviews/review.service";
import {AccommodationDetails} from "../accommodation-creation/model/accomodationDetails.model";
import {Review} from "../../reviews/review";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent {
  accommodation: AccommodationDetails;
  numberOfGuests: number = 1;
  events: number[] = [];
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  checkInString: string | null;
  checkOutString: string | null;
  reservation :ReservationBookingDtoModel;
  ownerReviews: Review[];
  accommodationReviews: Review[];
  averageOwnerScore: string;
  averageAccommdoationScore: string;

  constructor(public authService: AuthService,private dataPipe: DatePipe,private route: ActivatedRoute,
              private accommodationService: AccommodationService, private mapService: MapService,
              private router : Router, public dialog: MatDialog, public reviewService : ReviewService) {


    this.reservation = new class implements ReservationBookingDtoModel {
      accommodation: number;
      endDate: number;
      guest: string;
      id: number;
      numberOfGuests: number;
      startDate: number;
    }

  }

  loadAccommodationReviews(id : number){
    this.reviewService.getReviewsByAccommodationId(id).subscribe({
      next: (data: Review[]) => {
        this.accommodationReviews = data;
        this.averageAccommdoationScore = this.loadAccommodationScore(data).toFixed(1);
      }
    })
  }

  loadOwnerReviews(owner : string){
    this.reviewService.getReviewsByOwnerEmail(owner).subscribe({
      next: (data: Review[]) => {
        this.ownerReviews = data;
        this.averageOwnerScore = this.loadOwnerScore(data).toFixed(1);
      }
    })
  }

  loadOwnerScore(ownerReviews: Review[]){
    const filteredReviews = ownerReviews.filter(review => review.rating !== 0);
    return filteredReviews.length ? filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length
      : 0;
  }

  loadAccommodationScore(accommodationReviews: Review[]){
    const filteredReviews = accommodationReviews.filter(review => review.rating !== 0);
    return filteredReviews.length ? filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length
      : 0;
  }

  isAccommodationPreview(): boolean {
    return this.router.url.includes('accommodationPreview');
  }

  filter = (date: Date | null): boolean => {
    return !date || this.events.includes(date.getTime());
  };

  ngOnInit():void{

    let id = -5;

    this.route.params.subscribe((params) =>{
      id = +params['accommodationId']
      this.accommodationService.getAccommodationById(id).subscribe({
        next: (data: AccommodationDetails) => {
          this.accommodation = data;
          this.loadAvailabilities();
          this.loadAccommodationReviews(data.id);
          this.loadOwnerReviews(data.ownerEmail);
        }
      })
    });

  }

  bookReservation($event: MouseEvent) {
    this.checkInString = this.dataPipe.transform(this.checkInDate, 'yyyy-MM-dd');
    this.checkOutString = this.dataPipe.transform(this.checkOutDate, 'yyyy-MM-dd');

    if (this.checkInString && this.checkOutString) {
      const checkInDate = new Date(this.checkInString);
      const checkOutDate = new Date(this.checkOutString);

      if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
        // Strings are not null or empty and successfully parsed to valid Date objects
        const checkInSeconds = Math.floor(checkInDate.getTime() / 1000);
        const checkOutSeconds = Math.floor(checkOutDate.getTime() / 1000);
        if(checkOutSeconds < checkInSeconds){
          alert("Reservation cannot be made with those dates! ");
          return;
        }
        this.reservation.id = 0;
        this.reservation.accommodation = this.accommodation.id;
        this.reservation.numberOfGuests = this.numberOfGuests;
        this.reservation.guest = this.authService.getUsername();

        if (this.checkInString != null) {
          this.reservation.startDate = checkInSeconds;
        }
        if (this.checkOutString != null) {
          this.reservation.endDate = checkOutSeconds;
        }
        if(this.numberOfGuests < this.accommodation.minGuests || this.numberOfGuests > this.accommodation.maxGuests){
          alert("Reservation cannot be made for that number of guests! ");
          return;
        }

        if(this.authService.getRole() !== "Guest"){
          alert("You are not authorized to make reservations, make guest account! ");
          return;

        }

        this.accommodationService.createReservation(this.reservation).subscribe({
          next: (data: ReservationBookingResultDTO) => {
            this.checkInDate=null;
            this.checkOutDate=null;
            this.loadAvailabilities();
            alert(`Reservation: [Id: ${data.id}, \n Accommodation: ${data.accommodation}, \n Guest: ${data.guest},\n
        Start Date: ${data.startDate},\n End Date: ${data.endDate}, \n Number of Guests: ${data.numberOfGuests},\n
        Status: ${data.status},\n Price: ${data.price || 'N/A'}]`);
          },error:(_) =>{
            alert("You cannot book that reservation!")
          }
        });
      } else {
        console.log('Invalid date format in strings.');
      }
    } else {
      console.log('One or both strings are null or empty.');
    }

  }

  private loadAvailabilities() {
    this.events = [];
    this.accommodationService.getAccommodationAvailability(this.accommodation.id).subscribe({
      next: (availabilities: Availability[]) => {

        for(let i = 0; i < availabilities.length; i++){

          const startDate = new Date(availabilities[i].timeSlot.startEpochTime*1000);
          const endDate = new Date(availabilities[i].timeSlot.endEpochTime*1000);
          startDate.setHours(0);
          startDate.setMinutes(0);
          startDate.setSeconds(0);
          startDate.setMilliseconds(0);

          endDate.setHours(0);
          endDate.setMinutes(0);
          endDate.setSeconds(0);
          endDate.setMilliseconds(0);

          for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            this.events.push((new Date(currentDate)).getTime());
          }
        }
        console.log(this.events);
      },
      error: (_) => {
        console.log("Error!")
      }
    });
  }

  openReviewOwnerDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '550px',
      data: {
        accommodationId: 0,
        ownerEmail: this.accommodation.ownerEmail,
        reviewType: "Owner"
      }});
  }

  openReviewAccommodationDialog(): void{
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '550px',
      data: {
        accommodationId: this.accommodation.id,
        ownerEmail: "",
        reviewType: "Accommodation"
      }});
  }

  protected readonly environment = environment;

}
