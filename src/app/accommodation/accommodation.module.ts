import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Route} from "@angular/router";
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';

@NgModule({
  declarations: [
    AccommodationCardsComponent,
    AccommodationDetailsComponent
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
