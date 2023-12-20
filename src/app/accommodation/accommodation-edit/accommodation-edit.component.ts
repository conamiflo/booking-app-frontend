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
import {AccommodationType} from "../model/accommodationtype.model";
import {AccommodationService} from "../accommodation.service";
import {Observable} from "rxjs";
import {AmenityBackend} from "../model/amenity-backend.model";
import {AccommodationCreationService} from "../accommodation-creation/accommodation-creation.service";

@Component({
  selector: 'app-accommodation-creation',
  templateUrl: 'accommodation-edit.component.html',
  styleUrls: ['accommodation-edit.component.css'],
})
export class AccommodationEditComponent {

  accommodationId : number;
  accommodation : Observable<Accommodation>;
  constructor(private route: ActivatedRoute,private router: Router, private fb: FormBuilder,
              private accommodationCreationService: AccommodationCreationService,
              private authService: AuthService,private accommodationService: AccommodationService,
              private accommodationEditService: AccommodationEditService) {
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
  });

  allAmenities: Amenity[] = [];
  selectedAmenities: Amenity[] = [];
  prices: Price[] = [];
  newAccId: number;
  availability: Availability[] = [];
  uploadedPictures: File[] = [];


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accommodationId = params['id'] || -999;
    });

    this.accommodation = this.accommodationService.getAccommodation(this.accommodationId);
    this.loadAccommodationData(this.accommodation);
    this.loadFields();
    this.loadAmenities(this.accommodationId);
    this.loadAvailabilities(this.accommodationId);
    this.loadPrices(this.accommodationId);
    this.loadPriceType(this.accommodationId);
  }
  loadAccommodationData(accommodation: Observable<Accommodation>): void {
    accommodation.subscribe({
      next: (data: Accommodation) => {
        this.accommodationCreationForm.patchValue({
          appartmentName: data.name,
          description: data.description,
          location: data.location,
          defaultPrice: data.defaultPrice,
          maxGuests: data.maxGuests,
          minGuests: data.minGuests,
          type: data.type
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
        console.log(data);
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
      photos: [],
      minGuests: Number(this.accommodationCreationForm.controls.minGuests.value),
      maxGuests: Number(this.accommodationCreationForm.controls.maxGuests.value),
      created: new Date(),
      type: this.accommodationCreationForm.controls.type.value,
      priceType : priceType
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
    const p: Price = {
      price: this.accommodationCreationForm.controls.price.value,
      from: this.accommodationCreationForm.controls.priceFrom.value,
      to: this.accommodationCreationForm.controls.priceTo.value
    }
    this.prices.push(p);

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
    this.accommodationEditService.removeAccommodationAmenities(this.accommodationId);
    this.accommodationEditService.updateAccommodation(this.collectAccommodationData(),this.accommodationId).subscribe({
      next: (data: Accommodation) => {
        console.log(data);
        this.newAccId = data.id;
        this.addAmenities(this.newAccId);
        this.addPrices(this.newAccId);
        this.addAvailabilities(this.newAccId);
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
    const a: Availability = {
      from: this.accommodationCreationForm.controls.availableFrom.value,
      to: this.accommodationCreationForm.controls.availableTo.value
    }
    this.availability.push(a);

  }

}
