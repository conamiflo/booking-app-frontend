import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AccommodationEditService} from "./accommodation-edit.service";
import {AuthService} from "../../authentication/auth.service";
import {Amenity} from "../model/amenity.model";
import {Price} from "../accommodation-creation/model/price.model";
import {Availability} from "../accommodation-creation/model/availability.model";
import {PriceType} from "../accommodation-creation/model/price-type.model";
import {AccommodationDetails} from "../accommodation-creation/model/accomodationDetails.model";
import {Accommodation} from "../model/accommodation.model";
import {AvailabilityPost} from "../accommodation-creation/model/availability-post.model";
import {AccommodationService} from "../accommodation.service";
import {Observable} from "rxjs";
import {AccommodationCreationService} from "../accommodation-creation/accommodation-creation.service";
import {AccommodationStatus} from "../accommodation-creation/model/accommodation.status";
import {ReservationService} from "../../reservation/reservation.service";
import {GuestReservation} from "../../reservation/guest-reservation/model/reservation.model";
import {ReservationStatus} from "../../reservation/reservation.status";

@Component({
  selector: 'app-accommodation-creation',
  templateUrl: 'accommodation-edit.component.html',
  styleUrls: ['accommodation-edit.component.css'],
})
export class AccommodationEditComponent {

  accommodationId : number;
  accommodation : Observable<AccommodationDetails>;
  constructor(private route: ActivatedRoute,private router: Router, private fb: FormBuilder,
              private accommodationCreationService: AccommodationCreationService,
              private authService: AuthService,private accommodationService: AccommodationService,
              private accommodationEditService: AccommodationEditService, private reservationService: ReservationService) {
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
  reservations: GuestReservation[] = [];


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accommodationId = params['id'] || -999;
    });

    this.accommodation = this.accommodationService.getAccommodationById(this.accommodationId);
    this.loadAccommodationData(this.accommodation);
    this.loadFields();
    this.loadAmenities(this.accommodationId);
    this.loadAvailabilities(this.accommodationId);
    this.loadPrices(this.accommodationId);
    this.loadPriceType(this.accommodationId);
    this.loadReservations(this.accommodationId);
  }
  loadAccommodationData(accommodation: Observable<AccommodationDetails>): void {
    accommodation.subscribe({
      next: (data: AccommodationDetails) => {
        this.accommodationCreationForm.patchValue({
          appartmentName: data.name,
          description: data.description,
          location: data.location,
          defaultPrice: data.defaultPrice,
          maxGuests: data.maxGuests,
          minGuests: data.minGuests,
          type: data.type,
          cancellationDays: data.cancellationDays
        });
      }
    });
  }

  loadAmenities(accommodationId : number): void{
    this.accommodationEditService.getAmenitiesByAccommodationId(accommodationId).subscribe( {
      next: (data: Amenity[]) => {
        this.selectedAmenities = data;
      }
    })
  }

  loadAvailabilities(accommodationId : number): void{
    this.accommodationEditService.getAvailabilitiesByAccommodationId(accommodationId).subscribe( {
      next: (data: Availability[]) => {
        this.availability = data;
      }
    })
  }

  loadPrices(accommodationId : number): void{
    this.accommodationEditService.getPricesByAccommodationId(accommodationId).subscribe( {
      next: (data: Price[]) => {
        this.prices = data;
      }
    })
  }

  loadPriceType(accommodationId: number): void {
    this.accommodationCreationForm.controls.priceType.setValue('PER_GUEST');
  }

  loadFields() {
    this.accommodationCreationForm.controls.priceType.value
    this.accommodationCreationService.getAllAmmenities().subscribe({
      next: (data: Amenity[]) => {
        this.allAmenities = data;
      }
    })
  }

  loadReservations(id: number){
    this.reservationService.getReservationsByAccommodationId(id).subscribe({
      next: (data: GuestReservation[]) => {
        this.reservations = data;
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

  isOverlapWithAcceptedReservations(startEpochTime: number, endEpochTime: number, reservations: GuestReservation[]): boolean {
    const acceptedReservations = reservations.filter(reservation => reservation.status.toString() === "Accepted");

    for (const reservation of acceptedReservations) {
      const reservationStart: number = Date.parse(reservation.startDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1'));
      const reservationEnd: number = Date.parse(reservation.endDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1'));
      if (
        (startEpochTime >= reservationStart && startEpochTime <= reservationEnd) ||
        (endEpochTime >= reservationStart && endEpochTime <= reservationEnd) ||
        (startEpochTime <= reservationStart && endEpochTime >= reservationEnd)
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

  isValidCancellationDays(value: string): boolean {
    const numericValue = Number(value);
    return !isNaN(numericValue) && numericValue > 0 && value !== '';
  }


  isFormValid(): boolean {
    if(!this.isValidCancellationDays(this.accommodationCreationForm.controls.cancellationDays.value)){
      alert("Cancellation days should be greater than 0!");
      return false;
    }
    return true;
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

    if(this.isFormValid()){
      this.accommodationEditService.updateAccommodation(this.collectAccommodationData(),this.accommodationId).subscribe({
        next: (data: Accommodation) => {
          console.log(data);
          this.newAccId = data.id;
          this.addAmenities(this.newAccId);
          this.addPrices(this.newAccId);
          this.addAvailabilities(this.newAccId);
          this.addPictures(this.uploadedPictures);

          // this.router.navigate(['']);
          alert("Successfully edited accommodation!");
        },
        error: (_) => {
          console.log("Error!")
        }
      })

    }
  }

  removeAvailability(i: number) {
    this.availability.splice(i, 1);
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

  validateEmptyFields(firstDate: string, secondDate: string): boolean {
    console.log(firstDate);
    if (firstDate === null || secondDate === null) {
      alert("Date cant be empty!");
      return true;
    } else {
      return false;
    }
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

    if(this.isOverlapWithAcceptedReservations(startEpochTime,endEpochTime,this.reservations)){
      alert('There is a reservation in that period!');
      return false;
    }
    return true;
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
  private getPhotoNames() {
    let pictures : string[] = [];
    for(let i = 0; i < this.uploadedPictures.length; i++){
      pictures.push(this.uploadedPictures[i].name);
    }
    return pictures;
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
}
