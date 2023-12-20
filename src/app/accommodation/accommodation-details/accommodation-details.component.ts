import { Component } from '@angular/core';
import {Accommodation} from "../model/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {MapService} from "../../shared/map/map.service";
import * as L from "leaflet";
import {MapComponent} from "../../shared/map/map.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent {
  accommodation: Accommodation;
  numberOfGuests: number = 1;
  events: number[] = [];
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  checkInString: string | null;
  checkOutString: string | null;


  constructor(private dataPipe: DatePipe,private route: ActivatedRoute, private accommodationService: AccommodationService, private mapService: MapService) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.events = [
      today.getTime(),
      today.setDate(today.getDate() - 1),
      today.setDate(today.getDate() - 4)
    ];
  }


  filter = (date: Date | null): boolean => {
    return !date || this.events.includes(date.getTime());
  };


  ngOnInit():void{

    this.route.params.subscribe((params) =>{
      const id = +params['accommodationId']
      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => {
          console.log(data.defaultPrice)
          this.accommodation = data;

        }
      })
    })
  }

  bookReservation($event: MouseEvent) {
    this.checkInString = this.dataPipe.transform(this.checkInDate, 'yyyy-MM-dd');
    this.checkOutString = this.dataPipe.transform(this.checkOutDate, 'yyyy-MM-dd');
    console.log(this.numberOfGuests);
    console.log(this.checkInDate);
    console.log(this.checkOutDate);
    console.log(this.checkInString);
    console.log(this.checkOutString);
  }
}
