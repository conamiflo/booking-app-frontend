import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Route} from "@angular/router";
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AccommodationCardsComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent
  ],
  exports: [
    AccommodationCardsComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ]
})
export class AccommodationModule { }
