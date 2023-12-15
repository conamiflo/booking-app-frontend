import { Component } from '@angular/core';
import {Accommodation} from "../model/accommodation.model";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent {
  accommodations: Accommodation[] = [];
  clickedAccommodation: string = '';

  constructor(private  service: AccommodationService) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: Accommodation[]) =>{
        this.accommodations = data
      },
      error: (_) => {console.log("Error!")}
    })
  }

  onAccommodationClicked(accommodation: Accommodation): void {
    this.clickedAccommodation = accommodation.id.toString();
  }

}
