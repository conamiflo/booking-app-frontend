import { Component } from '@angular/core'
import {GuestReservation} from "../../guest-reservation/model/reservation.model";
import {ReservationService} from "../../reservation.service";
import {AuthService} from "../../../authentication/auth.service";
import {OwnerReservation} from "../owner.reservation";

@Component({
  selector: 'app-accommodation-request',
  templateUrl: './owner.reservations.html',
  styleUrls: ['./owner.reservations.css'],
})
export class OwnerReservationsComponent {

  ownerReservations: OwnerReservation[] = [];

  constructor(private  reservationService: ReservationService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.reservationService.getOwnerReservations(this.authService.getUsername()).subscribe({
      next: (data: OwnerReservation[]) =>{
        if (data && data.length > 0) {
          this.ownerReservations = data;
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
