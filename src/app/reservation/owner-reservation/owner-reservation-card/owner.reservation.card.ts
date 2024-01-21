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
import {NumberOfCancellationsModel} from "../number-of-cancelations.model";
import {Notification} from "../../../notifications/notification";
import {NotificationType} from "../../../notifications/notification.type";
import {AuthService} from "../../../authentication/auth.service";
import {NotificationService} from "../../../notifications/notification.service";

@Component({
  selector: 'app-owner-reservation-card-request',
  templateUrl: './owner.reservation.card.html',
  styleUrls: ['./owner.reservation.card.css'],
})
export class OwnerReservationCardComponent {

  @Input()
  ownerReservation:OwnerReservationModel;
  showCard: boolean = true;
  numberOfCancellations: NumberOfCancellationsModel;
  constructor(private router: Router,private reservationService: ReservationService, private authService: AuthService,
              private notificationService: NotificationService) {

  }
  ngOnInit(){
    this.getNumberOfCancellations();
  }

  acceptRequest() {
    this.ownerReservation.status = "Accepted";
    this.reservationService.acceptReservation(this.ownerReservation.id).subscribe({
      next: () => {
        const notificationForGuest : Notification = new class implements Notification {
          id: number;
          message: string;
          receiverEmail: string;
          type: NotificationType;
        };

        notificationForGuest.message = this.authService.getUsername() + " accepted reservation with id: "+ this.ownerReservation.id;
        notificationForGuest.id = 0;
        notificationForGuest.type = NotificationType.RESERVATION_RESPONSE;
        notificationForGuest.receiverEmail = this.ownerReservation.guest;
        this.notificationService.createNotification(notificationForGuest).subscribe({
          next: (data: Notification) => {
            alert("Guest notified!")
          },error:(_) =>{
            alert("You cannot accept that reservation!")
          }
        });
        window.location.reload();
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
        const notificationForGuest : Notification = new class implements Notification {
          id: number;
          message: string;
          receiverEmail: string;
          type: NotificationType;
        };

        notificationForGuest.message = this.authService.getUsername() + " declined reservation with id: " + this.ownerReservation.id;
        notificationForGuest.id = 0;
        notificationForGuest.type = NotificationType.RESERVATION_RESPONSE;
        notificationForGuest.receiverEmail = this.ownerReservation.guest;
        this.notificationService.createNotification(notificationForGuest).subscribe({
          next: (data: Notification) => {
            alert("Guest notified!")
          },error:(_) =>{
            alert("You cannot decline that reservation!")
          }
        });
        window.location.reload();
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

  private getNumberOfCancellations() {
    // Example: Call the API method to get the number of cancellations for a guest
    this.reservationService.getNumberOfCancellations(this.ownerReservation.guest).subscribe({
      next: (data) => {
        this.numberOfCancellations = data;
        console.log('Number of cancellations:', this.numberOfCancellations);
      },
      error: (error) => {
        console.error('Error fetching number of cancellations:', error);
      },
    });
  }

  protected readonly environment = environment;
  protected readonly ReservationStatus = ReservationStatus;
}
