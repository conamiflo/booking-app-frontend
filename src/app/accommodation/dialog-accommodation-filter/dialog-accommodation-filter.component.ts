import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {AccommodationFilterModel} from "../model/accommodation-filter.model";
import {min} from "rxjs";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../material.module";
import {Amenity} from "../model/amenity.model";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-dialog-accommodation-filter',
  templateUrl: './dialog-accommodation-filter.component.html',
  styleUrls: ['./dialog-accommodation-filter.component.css'],
  standalone: true,
  imports: [MatSliderModule, MatInputModule, FormsModule, MaterialModule, MatDialogModule, MatSelectModule, NgForOf],
})
export class DialogAccommodationFilterComponent {

  amenities: Amenity[] = [
    {id: 1, name: 'Amenity 1' },
    {id: 2, name: 'Amenity 2' },

  ];
  maxPrice :number;
  minPrice : number;
  value = 0;
  constructor(
    public dialogRef: MatDialogRef<DialogAccommodationFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccommodationFilterModel) {
    this.minPrice=1;
    this.maxPrice=1000;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onMinimumPriceChange() {

  }

  protected readonly min = min;
}

