import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from '../registration/register.component';
import {RouterModule, Route} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountActivationComponent} from "../account-activation/account.activation.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountActivationComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule { }
