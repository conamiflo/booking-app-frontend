import {Component, EventEmitter, Input, Output, OnChanges, SimpleChanges} from '@angular/core'

import {GuestReservation} from "../model/reservation.model";
import {ReservationStatus} from "../../reservation.status";
import {ReservationService} from "../../reservation.service";
import {AccommodationService} from "../../../accommodation/accommodation.service";
import {AccommodationDetails} from "../../../accommodation/accommodation-creation/model/accomodationDetails.model";
import {Notification} from "../../../notifications/notification";
import {NotificationType} from "../../../notifications/notification.type";
import {AuthService} from "../../../authentication/auth.service";
import {NotificationService} from "../../../notifications/notification.service";

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
  accommodation: AccommodationDetails;

  constructor(private reservationService: ReservationService, private accommodationService: AccommodationService,
                private authService: AuthService, private notificationService: NotificationService) {
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['guestReservation']) {
      this.updateCancelable();
    }
  }

  private updateCancelable(): void {

    this.accommodationService.getAccommodationById(Number(this.guestReservation.accommodation)).subscribe({
      next: (data: AccommodationDetails ) => {
        this.accommodation = data;
        const [day, month, year] = this.guestReservation.startDate.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day);

        this.cancelable =  (
          this.guestReservation.status.toString() === "Accepted" &&
          Math.floor(
            Math.floor(parsedDate.getTime() / 1000) - (data.cancellationDays * (24 * 60 * 60))
          ) > Math.floor(new Date().getTime() / 1000)
        );
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
        const notificationForOwner : Notification = new class implements Notification {
          id: number;
          message: string;
          receiverEmail: string;
          type: NotificationType;
        };

        notificationForOwner.message = this.authService.getUsername() + " cancelled reservation with id: "+ this.guestReservation.id;
        notificationForOwner.id = 0;
        notificationForOwner.type = NotificationType.CANCEL_RESERVATIONS;
        notificationForOwner.receiverEmail = this.accommodation.ownerEmail;
        this.notificationService.createNotification(notificationForOwner).subscribe({
          next: (data: Notification) => {
          },error:(_) =>{
            alert("You cannot cancel that reservation!")
          }
        });
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
