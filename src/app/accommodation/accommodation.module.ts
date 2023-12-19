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

import {FormsModule} from "@angular/forms";
import { DialogAccommodationFilterComponent } from './dialog-accommodation-filter/dialog-accommodation-filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialModule} from "../material.module";
import {MatSliderModule} from "@angular/material/slider";
import {MatLegacySliderModule} from "@angular/material/legacy-slider";
import {AccommodationCreationComponent} from "./accommodation-creation/accommodation-creation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AccommodationCardsComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent,
    AccommodationRequestComponent,
    AccommodationRequestCardComponent
    AccommodationCreationComponent
  ],
  exports: [
    AccommodationCardsComponent,
    AccommodationCreationComponent
  ],
  imports: [

    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MaterialModule,
    MatSliderModule,
    MatLegacySliderModule
    ReactiveFormsModule
  ]
})
export class AccommodationModule { }
