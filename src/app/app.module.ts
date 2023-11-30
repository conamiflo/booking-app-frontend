import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./authentication/auth.module";



import {ProfileComponent} from "./profile/profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProfileModule} from "./profile/profile.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
