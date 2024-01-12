import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../authentication/auth.service";
import {Router} from "@angular/router";
import {RegistrationService} from "./registration.service";
import {Registration} from "./model/registration.model";
import {GuestReservation} from "../reservation/guest-reservation/model/reservation.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registrationForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private registerService: RegistrationService, private router: Router) {
  }
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]],
      userType: ['', Validators.required]
    });
  }

  passwordsNotMatch(): boolean {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;

    return password !== confirmPassword;
  }
  checkField(fieldName: string): string | null {
    const control: AbstractControl | null = this.registrationForm.get(fieldName);

    if (control?.hasError('email')) {
      return `Invalid email address! `;
    }
    if (control?.hasError('pattern')) {
      if (fieldName === 'firstName') {
        return `First name should have only letters!.`;
      } else if (fieldName === 'lastName') {
        return `First name should have only letters!`;
      } else if (fieldName === 'phoneNumber') {
        return `Phone number should have only numbers! `;
      } else {
        return `Wrong format for ${fieldName}.`;
      }
    }
    if (fieldName === 'confirmPassword' && this.passwordsNotMatch()) {
      return `Passwords should match! .`;
    }
    return null;
  }

  onSubmit(): void {

    const errors: string[] = [];
    Object.keys(this.registrationForm.controls).forEach(key => {
      const errorMessage = this.checkField(key);
      if (errorMessage) {
        errors.push(errorMessage);
      }
    });

    if (errors.length > 0) {
      for (const error of errors) {
        alert(error);
      }
    } else {
      const registration : Registration = {
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        isActive: false,
        name: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        address: this.registrationForm.value.address,
        phoneNumber: this.registrationForm.value.phoneNumber,
        role: this.registrationForm.value.userType,
      };

      this.registerService.register(registration).subscribe({
        next: (response: Registration) =>{
          this.router.navigate([''])
        },
        error: (error: any) => {
          console.log("Error:", error);
        }
      })
    }
  }
}
