import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule, Route} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {GuestReservationComponent} from "./guest-reservation/guest-reservation-card/guest-reservation-card.component";
import {GuestReservationsComponent} from "./guest-reservation/guest-reservations/guest-reservations.component";
import {OwnerReservationCardComponent} from "./owner-reservation/owner-reservation-card/owner.reservation.card";
import {OwnerReservationsComponent} from "./owner-reservation/owner-reservations/owner.reservations";
import { ProfitStatisticsComponent } from './profit-statistics/profit-statistics.component';
import {LayoutModule} from "../layout/layout.module";

@NgModule({
  declarations: [
    GuestReservationComponent,
    GuestReservationsComponent,
    OwnerReservationCardComponent,
    OwnerReservationsComponent,
    ProfitStatisticsComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgOptimizedImage,
        LayoutModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservationsModule { }
