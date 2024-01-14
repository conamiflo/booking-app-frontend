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
          console.log(data);
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
