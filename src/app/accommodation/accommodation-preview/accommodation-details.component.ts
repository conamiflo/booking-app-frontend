// import { Component } from '@angular/core';
// import {Accommodation} from "../model/accommodation.model";
// import {ActivatedRoute} from "@angular/router";
// import {AccommodationService} from "../accommodation.service";
// import {MapService} from "../../shared/map/map.service";
// import * as L from "leaflet";
// import {MapComponent} from "../../shared/map/map.component";
// import {DatePipe} from "@angular/common";
// import {ReservationBookingDtoModel} from "../model/reservation-booking-dto.model";
// import {AuthService} from "../../authentication/auth.service";
// import {ReservationBookingResultDTO} from "../model/reservation-booking-result-dto.model";
// import {AccommodationWithAmenities} from "../model/accommodation-with-amenities.model";
// import {Availability} from "../model/availability.model";
//
// @Component({
//   selector: 'app-accommodation-details',
//   templateUrl: './accommodation-details.component.html',
//   standalone: true,
//   styleUrls: ['./accommodation-preview.component.css']
// })
// export class AccommodationDetailsComponent {
//   accommodation: Accommodation;
//   numberOfGuests: number = 1;
//   events: number[] = [];
//   checkInDate: Date | null = null;
//   checkOutDate: Date | null = null;
//   checkInString: string | null;
//   checkOutString: string | null;
//   reservation :ReservationBookingDtoModel;
//
//   constructor(private authService: AuthService,private dataPipe: DatePipe,private route: ActivatedRoute, private accommodationService: AccommodationService, private mapService: MapService) {
//
//
//     this.reservation = new class implements ReservationBookingDtoModel {
//       accommodation: number;
//       endDate: number;
//       guest: string;
//       id: number;
//       numberOfGuests: number;
//       startDate: number;
//     }
//
//   }
//
//
//   filter = (date: Date | null): boolean => {
//     return !date || this.events.includes(date.getTime());
//   };
//
//
//   ngOnInit():void{
//
//     this.route.params.subscribe((params) =>{
//       const id = +params['accommodationId']
//       this.accommodationService.getAccommodation(id).subscribe({
//         next: (data: Accommodation) => {
//           console.log(data.defaultPrice)
//           this.accommodation = data;
//           this.loadAvailabilities();
//         }
//       })
//     });
//
//
//   }
//
//   bookReservation($event: MouseEvent) {
//     this.checkInString = this.dataPipe.transform(this.checkInDate, 'yyyy-MM-dd');
//     this.checkOutString = this.dataPipe.transform(this.checkOutDate, 'yyyy-MM-dd');
//
//     if(this.numberOfGuests < this.accommodation.minGuests || this.numberOfGuests > this.accommodation.maxGuests){
//       alert("Reservation cannot be made for that number of guests! ");
//       return;
//     }
//
//     if(this.authService.getRole() !== "Guest"){
//       alert("You are not authorized to make reservations, make guest account! ");
//       return;
//
//     }
//
//     console.log(this.numberOfGuests);
//     console.log(this.checkInDate);
//     console.log(this.checkOutDate);
//     console.log(this.checkInString);
//     console.log(this.checkOutString);
//     this.reservation.id = 0;
//     this.reservation.accommodation = this.accommodation.id;
//     this.reservation.numberOfGuests = this.numberOfGuests;
//     this.reservation.guest = this.authService.getUsername();
//
//     if (this.checkInString != null) {
//       this.reservation.startDate = Number(this.checkInString);
//     }
//     if (this.checkOutString != null) {
//       this.reservation.endDate = Number(this.checkOutString);
//     }
//
//
//     this.accommodationService.createReservation(this.reservation).subscribe({
//       next: (data: ReservationBookingResultDTO) => {
//         alert(`Reservation: [Id: ${data.id}, \n Accommodation: ${data.accommodation}, \n Guest: ${data.guest},\n
//         Start Date: ${data.startDate},\n End Date: ${data.endDate}, \n Number of Guests: ${data.numberOfGuests},\n
//         Status: ${data.status},\n Price: ${data.price || 'N/A'}]`);
//       },error:(_) =>{
//         alert("You cannot book that reservation!")
//       }
//     })
//
//   }
//
//   private loadAvailabilities() {
//     this.accommodationService.getAccommodationAvailability(this.accommodation.id).subscribe({
//       next: (availabilities: Availability[]) => {
//
//         for(let i = 0; i < availabilities.length; i++){
//
//           const startDate = new Date(availabilities[i].timeSlot.startEpochTime);
//           const endDate = new Date(availabilities[i].timeSlot.endEpochTime);
//           console.log(i+"start"+startDate);
//
//           console.log(i+"end"+endDate);
//
//           // Iterate through dates within the time slot range
//           for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
//             this.events.push((new Date(currentDate)).getTime()); // Add the current date to the events list
//           }
//         }
//         console.log(this.events);
//       },
//       error: (_) => {
//         console.log("Error!")
//       }
//     });
//   }
// }
