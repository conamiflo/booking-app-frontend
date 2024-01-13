import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {GuestReservation} from "../model/reservation.model";
import {ReservationService} from "../../reservation.service";
import {AuthService} from "../../../authentication/auth.service";

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css'],
})
export class GuestReservationsComponent {
  guestReservations: GuestReservation[] = [];

  constructor(private  reservationService: ReservationService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.reservationService.getGuestReservations(this.authService.getUsername()).subscribe({
      next: (data: GuestReservation[]) =>{
        if (data && data.length > 0) {
          this.guestReservations = data;
        } else {
          console.log("Error.");
        }
      },
      error: (error: any) => {
        console.log("Error:", error);
      }
    })
  }

  onDeleteReservation(reservation: GuestReservation) {
    // Handle the deletion here
    // Update the reservations list by removing the deleted reservation
    const index = this.guestReservations.indexOf(reservation);
    if (index !== -1) {
      this.guestReservations.splice(index, 1);
    }

    // Send a request to the backend to delete the reservation
    this.reservationService.deleteReservation(reservation.id).subscribe({
      next: (response) => {
        console.log("Reservation deleted successfully:", response);
      },
      error: (error) => {
        console.log("Error deleting reservation:", error);
      }
    });
  }

}
