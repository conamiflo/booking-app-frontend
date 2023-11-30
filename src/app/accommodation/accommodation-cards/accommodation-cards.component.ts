import { Component } from '@angular/core';
import {Accommodation} from "../model/accommodation.model";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent {
  accommodations: Accommodation[];
}
