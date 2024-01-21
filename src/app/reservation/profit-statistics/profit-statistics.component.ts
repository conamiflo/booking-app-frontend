import {Component, ViewChild} from '@angular/core';
import {ChartData} from "chart.js";
import {ReservationService} from "../reservation.service";
import {AuthService} from "../../authentication/auth.service";
import {AccommodationNumberReservations} from "./models/accommodation-number-reservations.model";
import {ChartComponent} from "../../layout/chart/chart.component";
import {AccommodationProfit} from "./models/accommodation-profit.model";
import {AccommodationYearlyReservations} from "./models/accommodation-yearly-reservations.model";
import {AccommodationYearlyProfit} from "./models/accommodation-yearly-profit.model";
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-profit-statistics',
  templateUrl: './profit-statistics.component.html',
  styleUrls: ['./profit-statistics.component.css']
})
export class ProfitStatisticsComponent {
  endDate: string | null = null;
  startDate: string | null = null;
  selectedYear: number | null = null;
  @ViewChild('reservationsChart') reservationsChart: ChartComponent | undefined;
  @ViewChild('profitChart') profitChart: ChartComponent | undefined;
  @ViewChild('yearlyReservationsChart') yearlyReservationsChart: ChartComponent | undefined;
  @ViewChild('yearlyProfitChart') yearlyProfitChart: ChartComponent | undefined;
  accommodationsNumberOfReservations : AccommodationNumberReservations[] = [];

  barChartDataNumberOfReservations: ChartData<'bar'> = {
    labels: ['Number Of Reservations'],
    datasets: [
      { data: [12], label: 'Apartman A' },
      { data: [28], label: 'Apartaman B' },
    ],
  };
  barChartDataProfit: ChartData<'bar'> =  {
      labels: ['Profit'],
      datasets: [
        { data: [3123], label: 'Apartman A' },
        { data: [2314], label: 'Apartaman B' },
      ],
    };
  barChartDataYearlyReservations: ChartData<'bar'> =  {
      labels: ['Jan','Feb','Mar','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        { data: [12], label: 'Apartman A' },
        { data: [28], label: 'Apartaman B' },
      ],
    };
  barChartDataYearlyProfit: ChartData<'bar'> =  {
      labels: ['Jan','Feb','Mar','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        { data: [3333,4442,1244,124,5124,6453,463,234,1234,1245,765,2356], label: 'Apartman A' },
        { data: [5342,4442,1244,2356,123,533,463,234,1234,654,765,643], label: 'Apartaman B' },
      ],
    };
  constructor(private reservationService: ReservationService,private authService: AuthService) {
  }
  getStatistics() {
    if (this.startDate && this.endDate) {
      const startDateInSeconds = this.convertToEpochSeconds(this.startDate);
      const endDateInSeconds = this.convertToEpochSeconds(this.endDate);



      this.reservationService.getNumberOfReservations(startDateInSeconds, endDateInSeconds, this.authService.getUsername()).subscribe({
        next: (data: AccommodationNumberReservations[]) => {
          this.barChartDataNumberOfReservations.datasets = data.map(item => {
            return { data: [item.numberOfReservations], label: item.accommodationName };
          });
          this.reservationsChart?.update();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
      this.reservationService.getStatisticsProfit(startDateInSeconds, endDateInSeconds, this.authService.getUsername()).subscribe({
        next: (data: AccommodationProfit[]) => {
          this.barChartDataProfit.datasets = data.map(item => {
            return { data: [item.profit], label: item.accommodationName };
          });
          this.profitChart?.update();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
    } else {
      alert('Start date and end date must be selected.');
    }
    if (this.selectedYear) {
      this.reservationService.getYearlyNumberOfReservations(this.selectedYear, this.authService.getUsername()).subscribe({
        next: (data: AccommodationYearlyReservations[]) => {
          this.barChartDataYearlyReservations.datasets = data.map(item => {
            return { data: item.monthlyNumberOfReservations, label: item.accommodationName };
          });
          this.yearlyReservationsChart?.update();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });

      this.reservationService.getYearlyProfit(this.selectedYear, this.authService.getUsername()).subscribe({
        next: (data: AccommodationYearlyProfit[]) => {
          this.barChartDataYearlyProfit.datasets = data.map(item => {
            return { data: item.monthlyProfits, label: item.accommodationName };
          });
          this.yearlyProfitChart?.update();
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
    } else {
      alert('Year has to be selected for yearly statistics.');
    }
  }

  onYearSelected(year: number): void {
    this.selectedYear = year;
    // You can perform additional actions with the selected year
  }

  private convertToEpochSeconds(dateString: string): number{
    const epochMilliseconds = Date.parse(dateString);
    if (!isNaN(epochMilliseconds)) {
      return epochMilliseconds / 1000; // Convert milliseconds to seconds
    }
    return 0;
  }


  downloadPdf(): void {
    if (this.startDate && this.endDate && this.selectedYear) {

      const startDateInSeconds = this.convertToEpochSeconds(this.startDate);
      const endDateInSeconds = this.convertToEpochSeconds(this.endDate);

      this.reservationService.downloadPdf(startDateInSeconds, endDateInSeconds, this.selectedYear, this.authService.getUsername()).subscribe(
        (pdfBlob: Blob) => {
          // Use FileSaver.js to save the Blob as a file
          FileSaver.saveAs(pdfBlob, 'statistics.pdf');
        },
        (error) => {
          console.error('Error downloading PDF:', error);
        }
      );
    }else{
      alert("You have to select year, start date and end date to get PDF version.")
    }
  }
}
