import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ProfileService } from './profile.service';
import { Profile } from './model/profile.model';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  profile: Profile;

  ngOnInit(): void {
    this.profileService.getProfile(this.authService.getUsername()).subscribe({
      next: (data: Profile) => {
        this.profile = data;
        this.loadFields();
        this.disableForm();
      },
    });
  }

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl({ value: '', disabled: true }),
    address: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]),
    city: new FormControl(),
    state: new FormControl(),
    password: new FormControl('', [Validators.minLength(6)]),
    showPassword: new FormControl(),
    picture: new FormControl(),
    notifications: new FormControl(),
  });

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImageSrc: string | ArrayBuffer | null = null;

  editButtonsVisible = false;

  loadFields(): void {
    this.profileForm.controls['email'].setValue(this.profile.email);
    this.profileForm.controls['firstName'].setValue(this.profile.firstName);
    this.profileForm.controls['lastName'].setValue(this.profile.lastName);
    this.profileForm.controls['address'].setValue(this.profile.address);
    this.profileForm.controls['phone'].setValue(this.profile.phoneNumber.toString());
    this.profileForm.controls['password'].setValue('');
    this.profileForm.controls['showPassword'].setValue(false);
    this.profileForm.controls['notifications'].setValue(this.profile.notifications);
    this.selectedImageSrc = this.profile.photo;
  }

  onSubmit(): void {
    const errors: string[] = [];
    Object.keys(this.profileForm.controls).forEach((key) => {
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
      this.save();
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    if (file) {
      this.readImage(file);
    }
  }

  readImage(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedImageSrc = e.target!.result as string | ArrayBuffer;
    };

    reader.readAsDataURL(file);
    console.log(this);
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  get passwordInputType(): string {
    return this.profileForm.controls.showPassword.value ? 'text' : 'password';
  }

  resetForm() {
    this.loadFields();
  }

  disableForm() {
    Object.keys(this.profileForm.controls).forEach((controlName) => {
      const control = this.profileForm.get(controlName);
      control?.disable();
    });
  }

  enableForm(): void {
    Object.keys(this.profileForm.controls).forEach((controlName) => {
      if (controlName !== 'email') {
        const control = this.profileForm.get(controlName);
        control?.enable();
      }
    });
  }

  editForm() {
    this.enableForm();
    this.editButtonsVisible = true;
  }

  collectData(): Profile {
    const formValue = this.profileForm.value;

    const profileData: Profile = {
      firstName: formValue.firstName || '',
      lastName: formValue.lastName || '',
      email: this.profile.email || '',
      address: formValue.address || '',
      phoneNumber: Number(formValue.phone) || 0,
      password: formValue.password || '',
      notifications: formValue.notifications || '',
      photo: formValue.picture || '',
    };

    return profileData;
  }

  save() {
    this.profileService.updateProfile(this.collectData(), this.authService.getUsername()).subscribe({
      next: (data: Profile) => {
        this.profile = data;
        console.log(data);
        this.loadFields();
        this.disableForm();
        this.editButtonsVisible = false;
      },
    });
  }

  deleteUser() {
    this.profileService.deleteProfile(this.authService.getUsername());
    this.authService.logout().subscribe(() => {
      // Perform any additional logout tasks if needed
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }


  checkField(fieldName: string): string | null {
    const control: AbstractControl | null = this.profileForm.get(fieldName);

    if (control?.hasError('email')) {
      return `Invalid email address! `;
    }
    if (control?.hasError('pattern')) {
      if (fieldName === 'firstName') {
        return `First name should have only letters!.`;
      } else if (fieldName === 'lastName') {
        return `Last name should have only letters!`;
      } else if (fieldName === 'phoneNumber') {
        return `Phone number should have only numbers! `;
      } else {
        return `Wrong format for ${fieldName}.`;
      }
    }

    return null;
  }
}
