import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-page1',
  templateUrl: 'page1.component.html',
  styleUrls: ['page1.component.css'],
})
export class Page1 {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Page1 - exported project')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Page1 - exported project',
      },
    ])
  }
}
