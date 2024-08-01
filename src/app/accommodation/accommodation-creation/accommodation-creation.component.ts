import { Component } from '@angular/core'
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProfileService} from "../../profile/profile.service";
import {AuthService} from "../../authentication/auth.service";
import {Profile} from "../../profile/model/profile.model";
import {AccommodationCreationService} from "./accommodation-creation.service";
import {Amenity} from "./model/amenity.model";
import {Price} from "./model/price.model";
import {AccommodationDetails} from "./model/accomodationDetails.model";
import {Accommodation} from "../model/accommodation.model";
import {AccommodationType} from "./model/accommodation-type.model";
import {PriceType} from "./model/price-type.model";
import {Availability} from "./model/availability.model";
import {AvailabilityPost} from "./model/availability-post.model";
import {AccommodationRequestService} from "../accommodation-requests/accommodation.request.service";
import {AccommodationRequest} from "../accommodation-requests/model/accommodation.request.model";
import {DatePipe} from "@angular/common";
import {AccommodationStatus} from "./model/accommodation.status";

@Component({
  selector: 'app-accommodation-creation',
  templateUrl: 'accommodation-creation.component.html',
  styleUrls: ['accommodation-creation.component.css'],
})
export class AccommodationCreationComponent {

  constructor(private router: Router, private fb: FormBuilder, private accommodationCreationService: AccommodationCreationService,
              private authService: AuthService,private accommodationRequestService: AccommodationRequestService,
              private dataPipe: DatePipe) {
  }

  accommodationCreationForm = new FormGroup({
    appartmentName: new FormControl(),
    description: new FormControl(),
    type: new FormControl(),
    location: new FormControl(),
    minGuests: new FormControl(),
    maxGuests: new FormControl(),
    defaultPrice: new FormControl(),
    availableFrom: new FormControl(),
    availableTo: new FormControl(),
    pictures: new FormControl(),
    price: new FormControl(),
    priceFrom: new FormControl(),
    priceTo: new FormControl(),
    priceType: new FormControl(),
    cancellationDays: new FormControl(),
  });

  allAmenities: Amenity[] = [];
  selectedAmenities: Amenity[] = [];
  prices: Price[] = [];
  newAccId: number;
  availability: Availability[] = [];
  uploadedPictures: File[] = [];


  ngOnInit(): void {
    this.loadFields();
  }

  loadFields() {
    this.accommodationCreationForm.controls.priceType.value
    this.accommodationCreationService.getAllAmmenities().subscribe({
      next: (data: Amenity[]) => {
        this.allAmenities = data;
      }
    })
  }

  collectAccommodationData(){
    let priceType : PriceType;
    if (this.accommodationCreationForm.controls.priceType.value == "PER_GUEST") {
      priceType = PriceType.PerGuest;
    } else {
      priceType = PriceType.PerNight;
    }
    const a: AccommodationDetails = {
      id: 0,
      ownerEmail: this.authService.getUsername(),
      name: this.accommodationCreationForm.controls.appartmentName.value,
      description: this.accommodationCreationForm.controls.description.value,
      location: this.accommodationCreationForm.controls.location.value,
      defaultPrice: Number(this.accommodationCreationForm.controls.defaultPrice.value),
      photos: this.getPhotoNames(),
      minGuests: Number(this.accommodationCreationForm.controls.minGuests.value),
      maxGuests: Number(this.accommodationCreationForm.controls.maxGuests.value),
      created: Math.round( (new Date()).getTime() / 1000),
      type: this.accommodationCreationForm.controls.type.value,
      priceType : priceType,
      status : AccommodationStatus.Pending,
      cancellationDays: Number(this.accommodationCreationForm.controls.cancellationDays.value)
    }
    return a;
  }

  onSubmit() {

  }

  imageChoosenChanged($event: Event) {
    const files: FileList | null = ($event.target as HTMLInputElement).files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedPictures.push(files[i]);
        console.log(files[i].name);
      }
    }
  }
  deletePicture(index: number): void {
    this.uploadedPictures.splice(index, 1);
  }

  addToSelectedAmenities(selectedAmenity: Amenity): void {
    this.selectedAmenities.push(selectedAmenity);
  }

  deleteSelectedRow(i: number) {
    this.selectedAmenities.splice(i, 1);
  }

  removePrice(i: number) {
    this.prices.splice(i, 1);
  }

  validateEmptyFields(firstDate: string, secondDate: string): boolean {
    console.log(firstDate);
    if (firstDate === null || secondDate === null) {
      alert("Date cant be empty!");
      return true;
    } else {
      return false;
    }
  }
  addPrice(): void {
    const firstDate = this.accommodationCreationForm.controls.priceFrom.value;
    const secondDate = this.accommodationCreationForm.controls.priceTo.value;
    const startEpochTime: number = Date.parse(firstDate);
    const endEpochTime: number = Date.parse(secondDate);

    if(this.validateEmptyFields(firstDate,secondDate) || !this.validateAddPrice(startEpochTime,endEpochTime,this.accommodationCreationForm.controls.price.value)){
      return;
    }
    const p: Price = {
      price: this.accommodationCreationForm.controls.price.value,
      from: this.accommodationCreationForm.controls.priceFrom.value,
      to: this.accommodationCreationForm.controls.priceTo.value
    }
    this.prices.push(p);
    alert("Successfully added new price!");

  }


  validateAddAvailability(startEpochTime: number,endEpochTime: number): boolean{
    if (endEpochTime <= startEpochTime) {
      alert('Second date cant be before first!');
      return false;
    }
    const todayEpochTime: number = new Date().getTime();
    if (startEpochTime < todayEpochTime) {
      alert('Date cant be before today!');
      return false;
    }
    if (this.isOverlapAvailability(startEpochTime, endEpochTime, this.availability)) {
      alert('Availability is overlapping with existing availabilities!');
      return false;
    }
    return true;
  }

  isOverlapAvailability(startEpochTime: number, endEpochTime: number, existingAvailabilities: Availability[]): boolean {
    for (const existingAvailability of existingAvailabilities) {
      const existingStartEpochTime: number = Date.parse(existingAvailability.from);
      const existingEndEpochTime: number = Date.parse(existingAvailability.to);

      if (
        (startEpochTime >= existingStartEpochTime && startEpochTime <= existingEndEpochTime) ||
        (endEpochTime >= existingStartEpochTime && endEpochTime <= existingEndEpochTime) ||
        (startEpochTime <= existingStartEpochTime && endEpochTime >= existingEndEpochTime)
      ) {
        return true;
      }
    }
    return false;
  }

  isOverlapPrice(newStartEpochTime: number, newEndEpochTime: number, existingPrices: Price[]): boolean {
    for (const existingPrice of existingPrices) {
      const existingStartEpochTime: number = Date.parse(existingPrice.from);
      const existingEndEpochTime: number = Date.parse(existingPrice.to);
      if (
        (newStartEpochTime >= existingStartEpochTime && newStartEpochTime <= existingEndEpochTime) ||
        (newEndEpochTime >= existingStartEpochTime && newEndEpochTime <= existingEndEpochTime) ||
        (newStartEpochTime <= existingStartEpochTime && newEndEpochTime >= existingEndEpochTime)
      ) {
        return true;
      }
    }
    return false;
  }

  validateAddPrice(startEpochTime: number, endEpochTime: number, price: number): boolean{
    if (isNaN(price) || price <= 0) {
      alert('Price must be greater than 0!');
      return false;
    }
    if (endEpochTime <= startEpochTime) {
      alert('Second date cant be before first!');
      return false;
    }
    const todayEpochTime: number = new Date().getTime();
    if (startEpochTime < todayEpochTime) {
      alert('Date cant be before today!');
      return false;
    }
    if (this.isOverlapPrice(startEpochTime, endEpochTime, this.prices)) {
      alert('Price date is overlapping with existing price dates! ');
      return false;
    }
    return true;
  }

  addAmenities(id: number){
    for(let a of this.selectedAmenities){
      this.accommodationCreationService.addAmenity(a, id.toString()).subscribe({
        next: (data: Amenity) => {

        },
        error: (_) => {
          console.log("Error!")
        }
      })
    }
  }

  addPrices(id: number){
    for(let p of this.prices){
      this.accommodationCreationService.addPrice(p, id.toString()).subscribe({
        next: (data: Accommodation) => {

        },
        error: (_) => {
          console.log("Error!")
        }
      })
    }
  }

  addAvailabilities(id: number){
    for(let a of this.availability){
      this.accommodationCreationService.addAvailability(a, id.toString()).subscribe({
        next: (data: AvailabilityPost) => {

        },
        error: (_) => {
          console.log("Error!")
        }
      })
    }
  }

  createAccommodation() {
    this.accommodationCreationService.createAccommodation(this.collectAccommodationData()).subscribe({
      next: (data: Accommodation) => {
        console.log(data);
        this.newAccId = data.id;
        const acc: AccommodationType = {
          type: this.newAccId.toString()
        }
        this.addAmenities(this.newAccId);
        this.addPrices(this.newAccId);
        this.addAvailabilities(this.newAccId);
        this.addPictures(this.uploadedPictures);
        this.router.navigate(['']);

      },
      error: (_) => {
        console.log("Error!")
      }
    })

  }


  removeAvailability(i: number) {
    this.availability.splice(i, 1);
  }

  addAvailability() {
    const firstDate = this.accommodationCreationForm.controls.availableFrom.value;
    const secondDate = this.accommodationCreationForm.controls.availableTo.value;
    const startEpochTime: number = Date.parse(firstDate);
    const endEpochTime: number = Date.parse(secondDate);

    if(this.validateEmptyFields(firstDate,secondDate) || !this.validateAddAvailability(startEpochTime,endEpochTime)){
      return;
    }

    const a: Availability = {
      from: this.accommodationCreationForm.controls.availableFrom.value,
      to: this.accommodationCreationForm.controls.availableTo.value
    }
    this.availability.push(a);
    alert("Successfully added new availability!");
  }

  private addPictures(uploadedPictures: File[]) {
    for(let i = 0; i < uploadedPictures.length; i++){
      const formData: FormData = new FormData();
      formData.append('images', uploadedPictures[i], uploadedPictures[i].name);
      this.accommodationCreationService.uploadPictures(formData).subscribe(
        event => {console.log("Image uploaded successfully!")}
      )
    }
  }

  private getPhotoNames() {
    let pictures : string[] = [];
    for(let i = 0; i < this.uploadedPictures.length; i++){
      pictures.push(this.uploadedPictures[i].name);
    }
    return pictures;
  }
}
