import {Component, ElementRef, ViewChild} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "./profile.service";
import {Profile} from "./model/profile.model"
import {Accommodation} from "../accommodation/model/accommodation.model";
import {ProfileModule} from "./profile.module";
import {AuthService} from "../authentication/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {


  constructor(private fb: FormBuilder, private profileService: ProfileService, private authService: AuthService) { }

  profile : Profile;

  ngOnInit(): void{
    this.profileService.getProfile(this.authService.getUsername()).subscribe({
      next: (data: Profile) => {
        this.profile = data;
        this.loadFields();
        this.disableForm();
      }
    })

  }

  profileForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl({value:'', disabled:true}),
    address: new FormControl(),
    phone: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    password: new FormControl(),
    showPassword: new FormControl(),
    picture: new FormControl(),
    notifications: new FormControl(),

  })

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImageSrc: string | ArrayBuffer | null = null;

  editButtonsVisible = false;

  loadFields(): void{
    this.profileForm.controls['email'].setValue(this.profile.email);
    this.profileForm.controls['firstName'].setValue(this.profile.firstName);
    this.profileForm.controls['lastName'].setValue(this.profile.lastName);
    this.profileForm.controls['address'].setValue(this.profile.address);
    this.profileForm.controls['phone'].setValue(this.profile.phoneNumber);
    this.profileForm.controls['password'].setValue("");
    this.profileForm.controls['showPassword'].setValue(false);
    this.profileForm.controls['notifications'].setValue(this.profile.notifications);
    this.selectedImageSrc = this.profile.photo;
  }

  onSubmit(): void {
    //console.log(this.profileForm.value);
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
    console.log(this)
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

  collectData() : Profile{
    const formValue = this.profileForm.value;

    const profileData : Profile = {
      firstName : formValue.firstName,
      lastName : formValue.lastName,
      email : this.profile.email,
      address : formValue.address,
      phoneNumber : formValue.phone,
      password : formValue.password,
      notifications : formValue.notifications,
      photo : formValue.picture
    }

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
      }
    })
  }
}
