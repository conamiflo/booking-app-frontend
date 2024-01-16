import {Component} from '@angular/core'
import {ReservationService} from "../../reservation.service";
import {AuthService} from "../../../authentication/auth.service";
import {OwnerReservationModel} from "../owner-reservation.model";
import {ReservationStatus} from "../../reservation.status";
import {GuestReservation} from "../../guest-reservation/model/reservation.model";

@Component({
  selector: 'app-accommodation-request',
  templateUrl: './owner.reservations.html',
  styleUrls: ['./owner.reservations.css'],
})
export class OwnerReservationsComponent {
  checkOutDate: string;
  checkInDate: string;
  accommodationName: string;
  selectedFilter: string = "Status (default)";
  ownerReservations: OwnerReservationModel[] = [];

  constructor(private  reservationService: ReservationService, private authService: AuthService) {
  }
  ngOnInit(): void {

    this.reservationService.searchOwnersReservations(
      undefined,
      undefined,
      undefined,
      this.authService.getUsername()
    ).subscribe({
      next: (filteredReservations: OwnerReservationModel[]) => {
        this.filterReservationByStatus(filteredReservations);
      },
      error: () => {
        console.log("Error filtering reservations:");
      }
    });

    // this.reservationService.getOwnerReservations(this.authService.getUsername()).subscribe({
    //   next: (data: OwnerReservationModel[]) =>{
    //     if (data && data.length > 0) {
    //       this.ownerReservations = data.filter(reservation => reservation.status.toString() === "Waiting");
    //     } else {
    //       console.log("Error.");
    //     }
    //   },
    //   error: (error: any) => {
    //     console.log("Error:", error);
    //   }
    // });
  }

  filterReservations() {
    this.reservationService.searchOwnersReservations(
      this.convertToEpochSeconds(this.checkInDate),
      this.convertToEpochSeconds(this.checkOutDate),
      this.accommodationName,
      this.authService.getUsername()
    ).subscribe({
      next: (filteredReservations: OwnerReservationModel[]) => {
        // Handle the filtered reservations as needed

        this.filterReservationByStatus(filteredReservations);
      },
      error: () => {
        console.log("Error filtering reservations:");
      }
    });
  }

  private filterReservationByStatus(filteredReservations: OwnerReservationModel[]) {
    if(this.selectedFilter === "Status (default)"){
      this.ownerReservations = filteredReservations;
    }else if (this.selectedFilter === "Waiting"){
      this.ownerReservations = filteredReservations.filter(reservation => reservation.status === "Waiting");

    }else if (this.selectedFilter === "Accepted"){
      this.ownerReservations = filteredReservations.filter(reservation => reservation.status === "Accepted");

    }else if (this.selectedFilter === "Declined"){
      this.ownerReservations = filteredReservations.filter(reservation => reservation.status === "Declined");
    }
  }




  private convertToEpochSeconds(dateString: string): number | undefined {
    const epochMilliseconds = Date.parse(dateString);
    if (!isNaN(epochMilliseconds)) {
      return epochMilliseconds / 1000; // Convert milliseconds to seconds
    }
    return undefined;
  }
}
