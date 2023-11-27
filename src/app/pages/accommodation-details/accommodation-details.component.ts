import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'accommodation-details',
  templateUrl: 'accommodation-details.component.html',
  styleUrls: ['accommodation-details.component.css'],
})
export class AccommodationDetails {
  rawqzrv: string = ' '
  raw707y: string = ' '
  rawtw7o: string = ' '
  rawrpec: string = ' '
  rawt89z: string = ' '
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('AccommodationDetails - exported project')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'AccommodationDetails - exported project',
      },
    ])
  }
}
