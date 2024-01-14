import {Component} from "@angular/core";
import {Review} from "../../../reviews/review";
import {AuthService} from "../../../authentication/auth.service";
import {ReportService} from "../../report.service";
import {Report} from "../../report";

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css'],
})
export class AdminReportsComponent {
  reports: Report[] = [];
  constructor(private  reportService: ReportService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.reportService.getReports().subscribe({
      next: (data: Report[]) =>{
        if (data && data.length > 0) {
          this.reports = data;
        } else {
          console.log("Error.");
        }
      },
      error: (error: any) => {
        console.log("Error:", error);
      }
    })
  }
}
