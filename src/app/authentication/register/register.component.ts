import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  phoneNumber: string = '';

  onSubmit() {
    console.log('Form submitted!', this.email, this.password);
  }
}
