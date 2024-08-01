import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective, NgChartsModule} from 'ng2-charts';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() barChartData: ChartData<'bar'>;

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      }

    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  // public barChartData: ChartData<'bar'> = {
  //   labels: ['Number Of Reservations', 'Profit'],
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   ],
  // };

  // events
  public chartClicked({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public update(): void {

    this.chart?.update();
  }




}
