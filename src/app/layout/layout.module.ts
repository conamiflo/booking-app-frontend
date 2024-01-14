import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";
import { YearPickerComponent } from './year-picker/year-picker.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    YearPickerComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    RouterModule,
    YearPickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule
  ]
})
export class LayoutModule {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        const hideLayout = currentRoute.includes('login') || currentRoute.includes('register');
        sessionStorage.setItem('hideLayout', hideLayout ? 'true' : 'false');
      }
    });
  }
}
