import {Component, EventEmitter, Input, Output} from '@angular/core'
import {GuestReservation} from "../model/reservation.model";

@Component({
  selector: 'app-guest-reservation-card',
  templateUrl: './guest-reservation-card.component.html',
  styleUrls: ['./guest-reservation-card.component.css'],
})
export class GuestReservationComponent {

  @Input()
  guestReservation: GuestReservation;
  @Output() deleteReservation: EventEmitter<GuestReservation> = new EventEmitter<GuestReservation>();
  constructor() {}

  onDeleteReservation() {
    // Emit the deleteReservation event with the reservation to be deleted
    this.deleteReservation.emit(this.guestReservation);
  }
}
