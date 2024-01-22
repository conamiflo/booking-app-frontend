import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProfileService } from './profile.service';
import { Profile } from './model/profile.model';
import {environment} from "../../env/env";

describe('ProfileService', () => {
  let service: ProfileService;
  let httpController: HttpTestingController;
  const apiUrl = environment.apiHost + 'users/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ProfileService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getProfile and return the expected profile', () => {
    const email = 'ab@example.com';
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

    service.getProfile(email).subscribe((profile) => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpController.expectOne(apiUrl + email);
    req.flush(mockProfile);
  });

  it('should call updateProfile and return the updated profile', () => {
    const email = 'ab@example.com';
    const updatedProfile: Profile = {
      firstName: 'x',
      lastName: 'x',
      email: 'x@example.com',
      address: 'x',
      phoneNumber: 1234567890,
      password: 'password',
      notifications: false,
      photo: '',
    };

    service.updateProfile(updatedProfile, email).subscribe((profile) => {
      expect(profile).toEqual(updatedProfile);
    });

    const req = httpController.expectOne(apiUrl + email + '/update');
    req.flush(updatedProfile);
  });

  it('should call deleteProfile and show success alert on successful deletion', () => {
    const email = 'ab@example.com';

    spyOn(window, 'alert');

    service.deleteProfile(email);

    const req = httpController.expectOne(apiUrl + email);
    req.flush({}); // Successful deletion

    expect(window.alert).toHaveBeenCalledWith('Delete successful');
  });

});
