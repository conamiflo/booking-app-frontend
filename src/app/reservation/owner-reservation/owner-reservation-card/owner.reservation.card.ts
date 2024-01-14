import {Component, Input} from '@angular/core'
import {Router} from "@angular/router";
import {environment} from "../../../../env/env";
import {AccommodationDetails} from "../../../accommodation/accommodation-creation/model/accomodationDetails.model";
import {OwnerReservationModel} from "../owner-reservation.model";
import {Accommodation} from "../../../accommodation/model/accommodation.model";
import {AccommodationService} from "../../../accommodation/accommodation.service";
import {Observable} from "rxjs";
import {ReservationStatus} from "../../reservation.status";
import {ReservationService} from "../../reservation.service";

@Component({
  selector: 'app-owner-reservation-card-request',
  templateUrl: './owner.reservation.card.html',
  styleUrls: ['./owner.reservation.card.css'],
})
export class OwnerReservationCardComponent {

  @Input()
  ownerReservation:OwnerReservationModel;
  showCard: boolean = true;
  constructor(private router: Router,private reservationService: ReservationService) {

  }
  acceptRequest() {
    this.ownerReservation.status = "Accepted";
    this.reservationService.acceptReservation(this.ownerReservation.id).subscribe({
      next: () => {

      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

  declineRequest() : void {
    this.ownerReservation.status = "Declined";
    this.reservationService.declineReservation(this.ownerReservation.id).subscribe({
      next: () => {

      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }
  protected readonly environment = environment;
}
