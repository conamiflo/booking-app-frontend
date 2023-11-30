import { Component } from '@angular/core'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profileForm: FormGroup= this.fb.group({
    firstName: ['John', Validators.required],
    // Define other form controls here
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['John', Validators.required],
      // Define other form controls here
    });
  }

  onSubmit(): void {
    // Handle form submission logic here
    console.log(this.profileForm.value);
  }

  protected readonly dateTimestampProvider = dateTimestampProvider;
}
