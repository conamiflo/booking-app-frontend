import {Component, Inject} from '@angular/core';
import {Accommodation} from "../model/accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {Amenity} from "../model/amenity.model";
import {AccommodationType} from "../model/accommodationtype.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogAccommodationFilterComponent} from "../dialog-accommodation-filter/dialog-accommodation-filter.component";
import {AccommodationFilterModel} from "../model/accommodation-filter.model";


@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent {
  accommodations: Accommodation[] = [];
  clickedAccommodation: string = '';
  localUrl: any[];
  numberOfGuests: number;
  location: string;
  checkInDate: string;
  checkOutDate: string;
  showPopup: boolean = false;
  minimumPrice: number;
  maximumPrice: number;
  amenitiesFilter: Amenity[];
  accommodationTypeFilter: AccommodationType;

  constructor(public dialog: MatDialog, private service: AccommodationService) {
    this.numberOfGuests = 1;
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  submitForm(): void {
    // Handle form submission logic here
    console.log('Form submitted:');
    this.closePopup(); // Close the popup after form submission
  }


  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }

  onAccommodationClicked(accommodation: Accommodation): void {
    this.clickedAccommodation = accommodation.id.toString();
  }


  showPreviewImage(event: Event) {
    const target = <HTMLInputElement>event.target
    if (!target) return;
    if (target.files && target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.localUrl = e.target.result;
        console.log(this.localUrl);
      }
      reader.readAsDataURL(target.files[0]);
    }
  }

  onNumberOfGuestChanged() {
    console.log(this.numberOfGuests);
  }

  checkInDateChange() {
    console.log(this.checkInDate);
  }

  searchAccommodations() {
    console.log(this.numberOfGuests, this.location, this.checkInDate, this.checkOutDate)
    this.service.searchAccommodations(this.numberOfGuests, this.location, this.checkInDate, this.checkOutDate).subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data
      },
      error: (_) => {
        console.log("Error!")
      }
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAccommodationFilterComponent, {
      width: '350px',

      data: {minimumPrice: this.minimumPrice, maximumPrice: this.maximumPrice}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result !== undefined){
        this.minimumPrice = (<AccommodationFilterModel>result).minimumPrice;
        console.log("Minimalna cena" + this.minimumPrice)
      }

    });
  }
}
