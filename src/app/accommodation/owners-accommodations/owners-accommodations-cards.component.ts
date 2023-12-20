import { Component } from '@angular/core';
import {Accommodation} from "../model/accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './owners-accommodations-cards.component.html',
  styleUrls: ['./owners-accommodations-cards.component.css']
})
export class OwnersAccommodationsCardsComponent {
  accommodations: Accommodation[] = [];
  clickedAccommodation: string = '';

  constructor(private  service: AccommodationService,  private authService: AuthService) {
  }

  ngOnInit(): void {

    this.service.getOwnersAccommodation(this.authService.getUsername()).subscribe({
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
