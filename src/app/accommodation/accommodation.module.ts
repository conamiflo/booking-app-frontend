import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Route} from "@angular/router";
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {AccommodationCreationComponent} from "./accommodation-creation/accommodation-creation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OwnersAccommodationsCardsComponent} from "./owners-accommodations/owners-accommodations-cards.component";

@NgModule({
  declarations: [
    AccommodationCardsComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent,
    AccommodationCreationComponent,
    OwnersAccommodationsCardsComponent
  ],
  exports: [
    AccommodationCardsComponent,
    AccommodationCreationComponent,
    OwnersAccommodationsCardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccommodationModule { }
