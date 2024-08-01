import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AdminReportsComponent} from "./admin-report/admin-reports/admin-reports.component";
import {AdminReportsCardComponent} from "./admin-report/admin-reports-card/admin-reports-card.component";

@NgModule({
  declarations: [
    AdminReportsComponent,
    AdminReportsCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgOptimizedImage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
