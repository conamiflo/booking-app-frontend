import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Report} from "../../report";
import {ReportService} from "../../report.service";

@Component({
  selector: 'app-admin-reports-card',
  templateUrl: './admin-reports-card.component.html',
  styleUrls: ['./admin-reports-card.component.css'],
})
export class AdminReportsCardComponent {
  @Input()
  report: Report;

  constructor(private router: Router, private reportService: ReportService) {

  }

  deleteReview() {
    this.reportService.deleteReport(this.report.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

  blockUser() {
    this.reportService.blockUser(this.report.receiverEmail).subscribe({
      next: () => {
        this.deleteReview();
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }
}
