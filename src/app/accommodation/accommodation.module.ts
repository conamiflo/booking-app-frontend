import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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

import {OwnersAccommodationsCardsComponent} from "./owners-accommodations/owners-accommodations-cards.component";

import {SharedModule} from "../shared/shared.module";
import { DialogAccommodationFilterComponent } from './dialog-accommodation-filter/dialog-accommodation-filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialModule} from "../material.module";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccommodationCreationComponent } from './accommodation-creation/accommodation-creation.component';
import {MatLegacySliderModule} from "@angular/material/legacy-slider";

import {AccommodationEditComponent} from "./accommodation-edit/accommodation-edit.component";

import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {NgbCarousel, NgbCarouselModule, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {ReviewCardComponent} from "../reviews/review-card/review-card.component";



@NgModule({
  declarations: [
    AccommodationCardsComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent,
    AccommodationRequestComponent,
    AccommodationRequestCardComponent,
    AccommodationCreationComponent,
    AccommodationEditComponent,
    OwnersAccommodationsCardsComponent,
    ReviewCardComponent
  ],
  exports: [
    AccommodationCardsComponent,
    AccommodationCreationComponent,
    OwnersAccommodationsCardsComponent
  ],
  imports: [
    NgbCarouselModule,
    NgbSlide,
    NgbCarousel,
    MatNativeDateModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MaterialModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatLegacySliderModule,
    SharedModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgbCarousel,
    NgbSlide

  ]
})
export class AccommodationModule { }
