import { Component } from '@angular/core'
import {AuthService} from "../../../authentication/auth.service";
import {AccommodationRequestService} from "../accommodation.request.service";
import {GuestReservation} from "../../../reservation/guest-reservation/model/reservation.model";
import {ReservationService} from "../../../reservation/reservation.service";
import {AccommodationService} from "../../accommodation.service";
import {AccommodationDetails} from "../../accommodation-creation/model/accomodationDetails.model";
import {AccommodationEditService} from "../../accommodation-edit/accommodation-edit.service";

@Component({
  selector: 'app-accommodation-request',
  templateUrl: './accommodation.request.component.html',
  styleUrls: ['./accommodation.request.component.css'],
})
export class AccommodationRequestComponent {
  constructor(private accommodationService: AccommodationService) {
  }
  accommodationRequests: AccommodationDetails[] = [];
  ngOnInit(): void {
    this.accommodationService.getAllInactiveAccommodations().subscribe({
      next: (data: AccommodationDetails[]) =>{
        if (data && data.length > 0) {
          this.accommodationRequests = data;
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
