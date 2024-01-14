import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";

import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AdminReviewsComponent} from "./admin-review/admin-reviews/admin-reviews.component";
import {AdminReviewsCardComponent} from "./admin-review/admin-reviews-card/admin-reviews-card.component";

@NgModule({
  declarations: [
    AdminReviewsComponent,
    AdminReviewsCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgOptimizedImage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReviewsModule { }
