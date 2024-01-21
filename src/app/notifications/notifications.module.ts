import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";

import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NotificationsCardComponent} from "./notifications-card/notifications-card.component";
import {NotificationsPageComponent} from "./notifications-page/notifications-page.component";

@NgModule({
  declarations: [
    NotificationsCardComponent,
    NotificationsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgOptimizedImage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationsModule { }
