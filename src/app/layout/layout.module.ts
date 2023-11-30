import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule
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
