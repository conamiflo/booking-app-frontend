import { Component } from '@angular/core';
import {Accommodation} from "../model/accommodation.model";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent {
  accommodations: Accommodation[] = [];
  clickedAccommodation: string = '';
  // localUrl: any[];
  numberOfGuests: number;
  constructor(private  service: AccommodationService) {
    this.numberOfGuests = 1;
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: Accommodation[]) =>{
        this.accommodations = data
      },
      error: (_) => {console.log("Error!")}
    })
  }

  onAccommodationClicked(accommodation: Accommodation): void {
    this.clickedAccommodation = accommodation.id.toString();
  }


  // showPreviewImage(event: Event) {
  //   const target = <HTMLInputElement>event.target
  //   if(!target) return;
  //   if (target.files && target.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.localUrl = e.target.result;
  //       console.log(this.localUrl);
  //     }
  //     reader.readAsDataURL(target.files[0]);
  //   }
  // }

  onNumberOfGuestChanged() {
    console.log(this.numberOfGuests);
  }
}
