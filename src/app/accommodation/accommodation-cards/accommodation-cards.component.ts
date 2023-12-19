import {Component, Inject} from '@angular/core';
import {Accommodation} from "../model/accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {Amenity} from "../model/amenity.model";
import {AccommodationType} from "../model/accommodationtype.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogAccommodationFilterComponent} from "../dialog-accommodation-filter/dialog-accommodation-filter.component";
import {AccommodationFilterModel} from "../model/accommodation-filter.model";
import {AccommodationTypeCheckBox} from "../model/accommodation-type.model";
import {AmenityBackend} from "../model/amenity-backend.model";
import {AccommodationWithAmenities} from "../model/accommodation-with-amenities.model";


@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent {
  accommodations: AccommodationWithAmenities[] = [];
  accommodationsForShow: AccommodationWithAmenities[] =[];
  clickedAccommodation: string = '';
  localUrl: any[];
  numberOfGuests: number;
  location: string;
  checkInDate: string;
  checkOutDate: string;
  minimumPrice = 1;
  maximumPrice = 1000;
  selectedAccommodationType : AccommodationTypeCheckBox[] = [
    {value: "one-bedroom", name: 'One bedroom', checked: true },
    {value: "two-bedroom", name: 'Two bedroom', checked: true },
    {value: "house", name: 'House', checked: true },
    {value: "studio", name: 'Studio', checked: true }
  ];
  amenities: Amenity[] = [
    {id: 1, name: 'Amenity 1', checked: false },
    {id: 2, name: 'Amenity 2', checked: false },
  ];

  constructor(public dialog: MatDialog, private service: AccommodationService) {
    this.numberOfGuests = 1;
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: AccommodationWithAmenities[]) => {
        this.accommodations = data;
        this.accommodationsForShow = this.accommodations;
      },
      error: (_) => {
        console.log("Error!")
      }
    });
    this.service.getAllAmenitiesCheckBoxes().subscribe({
      next: (data: AmenityBackend[]) => {
        this.amenities = []
        for (let i = 0; i  < data.length; i++){
          this.amenities.push({id: data[i].id, name: data[i].name , checked: false });
        }

      },
      error: (_) => {
        console.log("Error!");
      }
    });
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
      next: (data: AccommodationWithAmenities[]) => {
        this.accommodations = data;
        this.accommodationsForShow = this.accommodations;
      },
      error: (_) => {
        console.log("Error!")
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAccommodationFilterComponent, {
      width: '350px',
      data: {minimumPrice: this.minimumPrice, maximumPrice: this.maximumPrice, amenities: this.amenities, type: this.selectedAccommodationType}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result !== undefined){
        this.minimumPrice = (<AccommodationFilterModel>result).minimumPrice;
        this.maximumPrice = (<AccommodationFilterModel>result).maximumPrice;
        this.selectedAccommodationType = (<AccommodationFilterModel>result).type;
        this.amenities = (<AccommodationFilterModel>result).amenities;

        this.accommodationsForShow = this.service.filter(this.maximumPrice, this.minimumPrice, this.selectedAccommodationType, this.amenities, this.accommodations);

      }else{
        this.minimumPrice = 1;
        this.maximumPrice = 1000;
        for (let i = 0; i < this.amenities.length; i++){
          this.amenities[i].checked = false;
        }
        for (let i = 0; i < this.selectedAccommodationType.length; i++){
          this.selectedAccommodationType[i].checked = true;
        }
        this.ngOnInit();
      }

    });
  }
}
