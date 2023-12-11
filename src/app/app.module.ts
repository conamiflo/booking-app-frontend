import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./authentication/auth.module";
import {AccommodationModule} from "./accommodation/accommodation.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



import {ProfileModule} from "./profile/profile.module";
import {LayoutModule} from "./layout/layout.module";
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import {ReservationsModule} from "./reservation/reservations.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AccommodationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProfileModule,
    LayoutModule,
    MapsModule,
    ReservationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
