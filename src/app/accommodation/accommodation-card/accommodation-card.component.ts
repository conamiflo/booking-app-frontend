import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation} from "../model/accommodation.model";
import {environment} from "../../../env/env";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  @Input()
  accommodation: Accommodation;

  @Output()
  clicked: EventEmitter<Accommodation> = new EventEmitter<Accommodation>();

  onAccommodationClicked(): void{
    this.clicked.emit(this.accommodation)
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
  constructor() {}

  protected readonly environment = environment;
}
