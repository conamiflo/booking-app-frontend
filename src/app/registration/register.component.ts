import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
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
