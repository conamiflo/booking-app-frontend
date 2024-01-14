import {Component} from '@angular/core'
import {ReservationService} from "../../reservation.service";
import {AuthService} from "../../../authentication/auth.service";
import {OwnerReservation} from "../owner.reservation";
import {ReservationStatus} from "../../reservation.status";

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
          this.ownerReservations = data.filter(reservation => reservation.status.toString() === "Waiting");
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
