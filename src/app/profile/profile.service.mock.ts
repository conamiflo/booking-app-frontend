import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Profile} from "./model/profile.model";

@Injectable()
export class ProfileServiceMock {
  constructor() {
  }

  getProfile(email: string): Observable<Profile> {
    const mockProfile: Profile = {
      firstName: 'a',
      lastName: 'b',
      email: 'ab@example.com',
      address: '123 Main St',
      phoneNumber: 1234567890,
      password: 'password',
      notifications: true,
      photo: '',
    };
    return of(mockProfile);
  }

  updateProfile(profile: Profile, email: string): Observable<Profile> {

    const updatedProfile: Profile = {
      ...profile,
      email,
    };
    return of(updatedProfile);
  }

}
