import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation} from "../model/accommodation.model";

import {environment} from "../../../env/env";

import {Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {AccommodationIsAutomaticApprovalDto} from "../model/accommodation-is-automatic-approval-dto.model";
import {ReservationBookingDtoModel} from "../model/reservation-booking-dto.model";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {AuthService} from "../../authentication/auth.service";
import {FavoriteAccommodationDTO} from "../model/favorite-accommodation-dto.model";


@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  @Input()
  accommodation: Accommodation;
  showEditButton: boolean = false;

  isAutomaticApproval: boolean = false;
  guestLoggedIn: boolean = false;
  isFavoriteAccommodation: boolean = false;

  favoriteAccommodation: FavoriteAccommodationDTO;
  accommodationIsAutomaticApproval: AccommodationIsAutomaticApprovalDto;

  @Output()
  clicked: EventEmitter<Accommodation> = new EventEmitter<Accommodation>();

  constructor(private router:Router, private accommodationService: AccommodationService, private authenticationService: AuthService) {
    this.accommodationIsAutomaticApproval = new class implements AccommodationIsAutomaticApprovalDto {
      id: number;
      automaticApproval: boolean;
    }

    this.favoriteAccommodation = new class implements FavoriteAccommodationDTO {
      accommodationId: number;
      favorite: boolean;
    }

    if(authenticationService.getRole() === "Guest"){
      this.guestLoggedIn = true;
    }

  }
  ngOnInit() {
    if (this.router.url.includes('owners-accommodations')) {
      this.showEditButton = true;
      this.loadAccommodationApproval();

    }
    if(this.authenticationService.getRole()=="Guest")
    {
      this.loadIsFavoriteAccommodation();
    }
  }
  goToEditPage(){
    this.router.navigate(['accommodationEdit', this.accommodation.id]);
  }

  onAccommodationClicked(): void{
    this.clicked.emit(this.accommodation)
  }
  loadAccommodationApproval() {
    this.accommodationService.getAccommodationIsAutomaticApprovalById(this.accommodation.id).subscribe((data) => {
      this.isAutomaticApproval = data.automaticApproval;
      this.accommodationIsAutomaticApproval.id = this.accommodation.id;
      this.accommodationIsAutomaticApproval.automaticApproval = this.isAutomaticApproval;
    });
  }
  private loadIsFavoriteAccommodation() {
    this.accommodationService.getIsFavoriteAccommodation(this.authenticationService.getUsername(),this.accommodation.id).subscribe((data) => {
      this.isFavoriteAccommodation = data.favorite; // Assign the value to toggle
      this.favoriteAccommodation.accommodationId = this.accommodation.id;
      this.favoriteAccommodation.favorite = this.isFavoriteAccommodation;
    });
  }
  toggleAutomaticApproval(event: MatSlideToggleChange) {
    this.isAutomaticApproval = event.checked;
    this.accommodationIsAutomaticApproval.automaticApproval = this.isAutomaticApproval;
    // Assuming you have a method in your service to update accommodation data
    this.accommodationService.setAccommodationIsAutomaticApproval(this.accommodationIsAutomaticApproval).subscribe(
      (data) => {
        // Handle success response after updating data
        console.log('Accommodation updated successfully! '+data.automaticApproval );
      },
      (error: any) => {
        // Handle error if the update fails
        console.error('Error updating accommodation:', error);
        // Revert the toggle if update fails
        this.isAutomaticApproval = !this.isAutomaticApproval;
      }
    );
  }
  toggleFavoriteAccommodation(event: MatSlideToggleChange) {
    this.isFavoriteAccommodation = event.checked;
    this.favoriteAccommodation.favorite = this.isFavoriteAccommodation;

    // Assuming you have a method in your service to update accommodation data
    this.accommodationService.setFavoriteAccommodation(this.authenticationService.getUsername(),this.favoriteAccommodation).subscribe(
      (data: FavoriteAccommodationDTO) => {
        // Handle success response after updating data
        console.log('Accommodation is favorite: '+data.favorite );
      },
      (error: any) => {
        // Handle error if the update fails
        console.error('Error updating favorite accommodation:', error);
        // Revert the toggle if update fails
        this.isFavoriteAccommodation = !this.isAutomaticApproval;
      }
    );
  }


  @Input()
  image_src: string = '/assets/external/accommodations/1/1.jpg'
  @Input()
  image_alt: string = 'image'
  @Input()
  text: string = 'Apartment A'
  @Input()
  text1: string = 'Novi Sad, Serbia'
  @Input()
  Vector_src5: string = '/assets/external/vector1631-ujof.svg'
  @Input()
  Vector_alt5: string = 'Vector1631'
  @Input()
  Vector_src: string = '/assets/external/vector1631-fczm.svg'
  @Input()
  Vector_alt: string = 'Vector1631'
  @Input()
  Vector_src1: string = '/assets/external/vector1631-3nsl.svg'
  @Input()
  Vector_alt1: string = 'Vector1631'
  @Input()
  Vector_src2: string = '/assets/external/vector1631-h2fs.svg'
  @Input()
  Vector_alt2: string = 'Vector1631'
  @Input()
  Vector_alt3: string = 'Vector1631'
  @Input()
  Vector_src3: string = '/assets/external/vector1631-sv1n.svg'
  @Input()
  text2: string = '4.8 (40)'
  @Input()
  text4: string = 'TV'
  @Input()
  text5: string = 'Wi-Fi'
  @Input()
  text6: string = 'Parking'
  @Input()
  text8: string = 'Kitchen'
  @Input()
  text3: string = '€195 '
  @Input()
  text7: string = 'per night'



  protected readonly environment = environment;

  protected readonly event = event;



}
