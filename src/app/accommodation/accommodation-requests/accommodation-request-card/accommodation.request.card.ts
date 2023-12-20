import { Component, Input } from '@angular/core'
import {GuestReservation} from "../../../reservation/guest-reservation/model/reservation.model";
import {Accommodation} from "../../model/accommodation.model";
import {AccommodationDetails} from "../../accommodation-creation/model/accomodationDetails.model";
import {AccommodationService} from "../../accommodation.service";

@Component({
  selector: 'app-accommodation-card-request',
  templateUrl: './accommodation.request.card.html',
  styleUrls: ['./accommodation.request.card.css'],
})
export class AccommodationRequestCardComponent {

  @Input()
  accommodation: AccommodationDetails;
  constructor(private accommodationService : AccommodationService) {}

  acceptRequest() {
      this.accommodationService.activateAccommodation(this.accommodation.id);
  }


}
