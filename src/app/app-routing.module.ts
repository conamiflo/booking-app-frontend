import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./authentication/register/register.component";
import {LoginComponent} from "./authentication/login/login.component";

import {AccommodationCardsComponent} from "./accommodation/accommodation-cards/accommodation-cards.component";

import {ProfileComponent} from "./profile/profile.component";
import {AccommodationDetailsComponent} from "./accommodation/accommodation-details/accommodation-details.component";
import {
  GuestReservationsComponent
} from "./reservation/guest-reservation/guest-reservations/guest-reservations.component";
import {AccommodationCreationComponent} from "./accommodation/accommodation-creation/accommodation-creation.component";


const routes: Routes = [
  { path: '', redirectTo: '/accommodation', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'accommodation', component:AccommodationCardsComponent},
  { path: 'accommodation/:accommodationId', component:AccommodationDetailsComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'guest/reservations', component: GuestReservationsComponent},
  { path: 'accommodation-creation', component: AccommodationCreationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
