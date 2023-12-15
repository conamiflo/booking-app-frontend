import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Route} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {GuestReservationComponent} from "./guest-reservation/guest-reservation-card/guest-reservation-card.component";
import {GuestReservationsComponent} from "./guest-reservation/guest-reservations/guest-reservations.component";

@NgModule({
  declarations: [
    GuestReservationComponent,
    GuestReservationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservationsModule { }
