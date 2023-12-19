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

  constructor(
    public dialogRef: MatDialogRef<DialogAccommodationFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccommodationFilterModel) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSelectionChangeAmenity($event: Event) {
    const target = $event.target as HTMLInputElement;
    console.log(target.value +",Checked: "+target.checked);
  }




  onChangeAmenity($event: Event) {

    const target = $event.target as HTMLInputElement;
    const id = target.value;
    const isChecked = target.checked;

    this.data.amenities = this.data.amenities.map((d) =>
    {
      // @ts-ignore
      if(d.id == id){
        d.checked = isChecked;
        return d;
      }return d;
    })


    console.log(id + " " + isChecked);
  }

  onChangeAccommodationType($event: Event) {
    const target = $event.target as HTMLInputElement;
    const value = target.value;
    const isChecked = target.checked;

    this.data.type = this.data.type.map((d)=>{
      if(d.value == value){
        d.checked = isChecked;
        return d;
      }
      return d;
    })
  }
}

