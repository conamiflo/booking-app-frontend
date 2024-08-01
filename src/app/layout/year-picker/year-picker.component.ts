import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.css']
})
export class YearPickerComponent {
  @Output() yearSelected = new EventEmitter<number>();
  years: number[] = [];

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();

    // Hard code the range (5 years in the past and 20 years in the future from 2024)
    const startYear = 2024;
    const endYear = startYear + 20;

    for (let year = startYear - 5; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  onYearSelected(year: number): void {
    this.yearSelected.emit(year);
  }
}
