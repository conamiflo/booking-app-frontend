import {Component, ElementRef, ViewChild} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {

  profileForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    phone: new FormControl(),
    username: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    password: new FormControl(),
    showPassword: new FormControl(),
    picture: new FormControl()
  })
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void{
    this.loadFields();
  }
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImageSrc: string | ArrayBuffer | null = null;

  loadFields(): void{
    this.profileForm.controls['firstName'].setValue('John');
    this.profileForm.controls['lastName'].setValue('Jones');
    this.profileForm.controls['email'].setValue('jones14@gmail.com');
    this.profileForm.controls['address'].setValue('33062 Zboncak isle');
    this.profileForm.controls['phone'].setValue('0617597142');
    this.profileForm.controls['username'].setValue('jones14');
    this.profileForm.controls['city'].setValue('Mehrab');
    this.profileForm.controls['state'].setValue('Bozorgi');
    this.profileForm.controls['password'].setValue('qwerasdf');
    this.profileForm.controls['showPassword'].setValue(false);

    this.selectedImageSrc = '/assets/external/person.svg';
  }

  onSubmit(): void {
    console.log(this.profileForm.value);
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
}
