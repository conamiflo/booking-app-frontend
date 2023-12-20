import { Component } from '@angular/core'
import {AuthService} from "../../../authentication/auth.service";
import {AccommodationRequestService} from "../accommodation.request.service";

@Component({
  selector: 'app-accommodation-request',
  templateUrl: './accommodation.request.component.html',
  styleUrls: ['./accommodation.request.component.css'],
})
export class AccommodationRequestComponent {
  constructor(private accommodationRequestService: AccommodationRequestService) {
  }

}
