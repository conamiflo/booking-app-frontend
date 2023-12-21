import {Component, Input} from '@angular/core'
import {AccommodationDetails} from "../../accommodation-creation/model/accomodationDetails.model";
import {AccommodationStatus} from "../../accommodation-creation/model/accommodation.status";
import {AccommodationEditService} from "../../accommodation-edit/accommodation-edit.service";
import {Accommodation} from "../../model/accommodation.model";
import {Router} from "@angular/router";
import {environment} from "../../../../env/env";

@Component({
  selector: 'app-accommodation-card-request',
  templateUrl: './accommodation.request.card.html',
  styleUrls: ['./accommodation.request.card.css'],
})
export class AccommodationRequestCardComponent {

  @Input()
  accommodation: AccommodationDetails;
  showCard: boolean = true;
  constructor(private accommodationService : AccommodationEditService, private router: Router) {}

  acceptRequest() {
    this.accommodation.status = AccommodationStatus.Active;
    this.accommodationService.activateAccommodation(this.accommodation.id).subscribe({
      next: () => {
        this.showCard = false;
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

  declineRequest() : void {
    this.accommodation.status = AccommodationStatus.Declined;
    this.accommodationService.updateAccommodation(this.accommodation,this.accommodation.id).subscribe({
      next: (data: Accommodation) => {
        this.showCard = false;
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

  accommodationPreview(){
    this.router.navigate(['accommodationPreview', this.accommodation.id]);
  }


  protected readonly environment = environment;
}
