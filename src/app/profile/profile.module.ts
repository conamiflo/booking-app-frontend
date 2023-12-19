import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [

    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
