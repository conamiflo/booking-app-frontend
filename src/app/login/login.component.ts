import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Login')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Login',
      },
    ])
  }
}

