import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-component',
  templateUrl: 'component.component.html',
  styleUrls: ['component.component.css'],
})
export class AppComponent {
  @Input()
  image_src: string = '/assets/external/accommodations/1/1-300h.png'
  @Input()
  image_alt: string = 'image'
  @Input()
  Vector_src: string = '/assets/external/vector1631-ujof.svg'
  @Input()
  Vector_alt: string = 'Vector1631'
  @Input()
  Vector_src1: string = '/assets/external/vector1631-fczm.svg'
  @Input()
  Vector_alt1: string = 'Vector1631'
  @Input()
  Vector_src2: string = '/assets/external/vector1631-3nsl.svg'
  @Input()
  Vector_alt2: string = 'Vector1631'
  @Input()
  Vector_src3: string = '/assets/external/vector1631-h2fs.svg'
  @Input()
  Vector_alt3: string = 'Vector1631'
  @Input()
  Vector_src4: string = '/assets/external/vector1631-sv1n.svg'
  @Input()
  Vector_alt4: string = 'Vector1631'
  @Input()
  text: string = '$195'
  @Input()
  location: string = 'Novi Sad'
  @Input()
  apartment: string = 'Apartment A'
  @Input()
  location1: string = '4.8 (30)'
  constructor() {}
}
