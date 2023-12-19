import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Route} from "@angular/router";
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {
  AccommodationRequestComponent
} from "./accommodation-requests/accommodation-request/accommodation.request.component";
import {
  AccommodationRequestCardComponent
} from "./accommodation-requests/accommodation-request-card/accommodation.request.card";

@NgModule({
  declarations: [
    AccommodationCardsComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent,
    AccommodationRequestComponent,
    AccommodationRequestCardComponent
  ],
  exports: [
    AccommodationCardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AccommodationModule { }
