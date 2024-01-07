import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MaterialModule} from "../../../material.module";

@Component({
  selector: 'app-owner-review-dialog',
  templateUrl: './owner-review-dialog-component.html',
  styleUrls: ['./owner-review-dialog-component.css'],
  standalone: true,
  imports: [MatSliderModule, MatInputModule, FormsModule, MatDialogModule, MatSelectModule, NgForOf, MaterialModule],
})
export class OwnerReviewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OwnerReviewDialogComponent>) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

