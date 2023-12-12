import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./authentication/auth.module";
import {AccommodationModule} from "./accommodation/accommodation.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



import {ProfileModule} from "./profile/profile.module";
import {LayoutModule} from "./layout/layout.module";
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import {Interceptor} from "./authentication/interceptor";

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
    MapsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
