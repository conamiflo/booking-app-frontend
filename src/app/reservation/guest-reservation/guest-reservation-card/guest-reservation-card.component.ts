import { Component, Input } from '@angular/core'
import {GuestReservation} from "../model/reservation.model";

@Component({
  selector: 'app-guest-reservation-card',
  templateUrl: './guest-reservation-card.component.html',
  styleUrls: ['./guest-reservation-card.component.css'],
})
export class GuestReservationComponent {

  @Input()
  guestReservation: GuestReservation;
  constructor() {}
}
