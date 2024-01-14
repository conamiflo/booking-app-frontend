import { Component } from '@angular/core';

@Component({
  selector: 'app-profit-statistics',
  templateUrl: './profit-statistics.component.html',
  styleUrls: ['./profit-statistics.component.css']
})
export class ProfitStatisticsComponent {
  endDate: Date | null = null;
  startDate: Date | null = null;

  getStatistics() {

  }

  onYearSelected(year: number): void {
    console.log('Selected year:', year);
    // You can perform additional actions with the selected year
  }

  downloadPdf() {

  }
}
