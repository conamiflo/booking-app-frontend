import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MaterialModule} from "../../material.module";
import {AccommodationFilterModel} from "../../accommodation/model/accommodation-filter.model";
import {AuthService} from "../../authentication/auth.service";
import {Amenity} from "../../accommodation/accommodation-creation/model/amenity.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ReviewDialogModel} from "../../reviews/review.dialog";
import {ReviewService} from "../../reviews/review.service";
import {ReportDialogModel} from "../report.dialog";
import {ReportService} from "../report.service";
import {Review} from "../../reviews/review";
import {Report} from "../report";

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog-component.html',
  styleUrls: ['./report-dialog-component.css'],
  standalone: true,
  imports: [MatSliderModule, MatInputModule, FormsModule, MatDialogModule, MatSelectModule, NgForOf, MaterialModule],
})
export class ReportDialogComponent {

  reportText: string = '';
  selectedUser: string = '';
  userEmail: string = '';
  reportType: string;
  users: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportDialogModel,
    private reportService: ReportService, private authService: AuthService
  ) {
    this.userEmail = data.userEmail;
    this.reportType = data.reportType;

    if(this.authService.getRole() === "Guest"){
      this.loadOwners(this.authService.getUsername());
    }else{
      this.loadGuests(this.authService.getUsername());
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  createReport() : Report{
    return {
      id: 0,
      senderEmail: this.userEmail,
      receiverEmail: this.selectedUser,
      content: this.reportText
    };
  }
  submitReport(): void {
    if(this.selectedUser === '' || this.reportText === ''){
      alert(`You have to fill in the fields! `);
    }else{
      this.reportService.createReport(this.createReport()).subscribe({
        next: (data: Report) => {
          this.dialogRef.close();
          alert(`Successfully sent a ${this.reportType} report! `)
        },
        error: (err: HttpErrorResponse) => {
          if (err && err.error) {
            alert(err.error);
            this.dialogRef.close();
          }
        }
      })
    }
  }

  loadGuests(ownerEmail : string){
    this.reportService.getGuestsForOwnerReport(ownerEmail).subscribe({
      next: (data: string[]) => {
        this.users = data;
      }
    })
  }

  loadOwners(guestEmail : string){
    this.reportService.getOwnersForGuestReport(guestEmail).subscribe({
      next: (data: string[]) => {
        this.users = data;
      }
    })
  }

}
