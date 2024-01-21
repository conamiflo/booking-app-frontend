import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./registration/register.component";
import {LoginComponent} from "./authentication/login/login.component";

import {AccommodationCardsComponent} from "./accommodation/accommodation-cards/accommodation-cards.component";

import {ProfileComponent} from "./profile/profile.component";
import {AccommodationDetailsComponent} from "./accommodation/accommodation-details/accommodation-details.component";
import {
  GuestReservationsComponent
} from "./reservation/guest-reservation/guest-reservations/guest-reservations.component";
import {AccountActivationComponent} from "./account-activation/account.activation.component";
import {
  AccommodationRequestComponent
} from "./accommodation/accommodation-requests/accommodation-request/accommodation.request.component";
import {AccommodationCreationComponent} from "./accommodation/accommodation-creation/accommodation-creation.component";

import {AccommodationEditComponent} from "./accommodation/accommodation-edit/accommodation-edit.component";

import {
  OwnersAccommodationsCardsComponent
} from "./accommodation/owners-accommodations/owners-accommodations-cards.component";
import {OwnerReservationsComponent} from "./reservation/owner-reservation/owner-reservations/owner.reservations";
import {
  FavoriteAccommodationsComponent
} from "./accommodation/favorite-accommodations/favorite-accommodations.component";
import {AdminReviewsComponent} from "./reviews/admin-review/admin-reviews/admin-reviews.component";

import {AdminReportsComponent} from "./reports/admin-report/admin-reports/admin-reports.component";

import {ProfitStatisticsComponent} from "./reservation/profit-statistics/profit-statistics.component";
import {NotificationsPageComponent} from "./notifications/notifications-page/notifications-page.component";


const routes: Routes = [
  { path: '', redirectTo: '/accommodation', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'accommodation', component:AccommodationCardsComponent},
  { path: 'accommodation/:accommodationId', component:AccommodationDetailsComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'guest/reservations', component: GuestReservationsComponent},
  { path: 'guest/favorite-accommodations', component: FavoriteAccommodationsComponent},
  { path: 'owner/reservations', component:OwnerReservationsComponent},
  { path: 'activation/:email', component: AccountActivationComponent},
  { path: 'accommodationRequests', component: AccommodationRequestComponent},
  { path: 'accommodation-creation', component: AccommodationCreationComponent},
  { path: 'accommodationEdit/:id', component: AccommodationEditComponent},
  { path: 'accommodation-creation', component: AccommodationCreationComponent},
  { path: 'owners-accommodations', component: OwnersAccommodationsCardsComponent},
  { path: 'accommodationPreview/:accommodationId', component:AccommodationDetailsComponent},
  { path: 'admin/reviews', component:AdminReviewsComponent},

  { path: 'admin/reports', component:AdminReportsComponent}

  { path: 'owner/statistics', component:ProfitStatisticsComponent},
  { path: 'notifications/:email', component:NotificationsPageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
