import {Component, EventEmitter, Input, Output, OnChanges, SimpleChanges} from '@angular/core'

import {GuestReservation} from "../model/reservation.model";
import {ReservationStatus} from "../../reservation.status";
import {ReservationService} from "../../reservation.service";
import {AccommodationService} from "../../../accommodation/accommodation.service";
import {AccommodationDetails} from "../../../accommodation/accommodation-creation/model/accomodationDetails.model";

@Component({
  selector: 'app-guest-reservation-card',
  templateUrl: './guest-reservation-card.component.html',
  styleUrls: ['./guest-reservation-card.component.css'],
})
export class GuestReservationComponent implements OnChanges{

  @Input()
  guestReservation: GuestReservation;
  cancelable: boolean = false;
  deletable: boolean = false;

  constructor(private reservationService: ReservationService, private accommodationService: AccommodationService) {
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['guestReservation']) {
      this.updateCancelable();
    }
  }

  private updateCancelable(): void {

    this.accommodationService.getAccommodationById(Number(this.guestReservation.accommodation)).subscribe({
      next: (data: AccommodationDetails ) => {
        const [day, month, year] = this.guestReservation.startDate.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day);

        this.cancelable = (this.guestReservation.status.toString() === "Accepted" && Math.floor((Math.floor(parsedDate.getTime() / 1000) - new Date().getTime()/1000) / (24 * 60 * 60)) > data.cancellationDays);

        this.deletable = this.guestReservation.status.toString() === "Waiting";

        },
      error: (_) => {
        console.log("Error!")
      }
    })

  }

  cancelReservation() {
    this.guestReservation.status = ReservationStatus.Cancelled;
    this.reservationService.cancelReservation(this.guestReservation.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

  @Output() deleteReservation: EventEmitter<GuestReservation> = new EventEmitter<GuestReservation>();


  onDeleteReservation() {
    // Emit the deleteReservation event with the reservation to be deleted
    this.deleteReservation.emit(this.guestReservation);
  }
}
