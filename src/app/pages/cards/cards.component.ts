import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-cards',
  templateUrl: 'cards.component.html',
  styleUrls: ['cards.component.css'],
})
export class Cards {
  constructor(private title: Title) {
    this.title.setTitle('exported project')
  }
}
