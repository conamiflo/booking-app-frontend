import { Component } from '@angular/core';
import {AccommodationWithAmenities} from "../model/accommodation-with-amenities.model";
import {MatDialog} from "@angular/material/dialog";
import {AccommodationService} from "../accommodation.service";
import {AmenityBackend} from "../model/amenity-backend.model";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'app-favorite-accommodations',
  templateUrl: './favorite-accommodations.component.html',
  styleUrls: ['./favorite-accommodations.component.css']
})
export class FavoriteAccommodationsComponent {
  accommodationsForShow: AccommodationWithAmenities[];

  constructor(private service: AccommodationService, private authService : AuthService) {
  }
  ngOnInit(): void {
    this.service.getFavoriteAccommodationsForGuest(this.authService.getUsername()).subscribe({
      next: (data: AccommodationWithAmenities[]) => {
        this.accommodationsForShow = data;
      },
      error: () => {
        console.log("Error!")
      }
    });

  }
}
