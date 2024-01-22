import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { BrowserModule, By } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from "../authentication/auth.service";
import {ProfileService} from "./profile.service";
import {Profile} from "./model/profile.model";
import {of} from "rxjs";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Router} from "@angular/router";
import {ProfileServiceMock} from "./profile.service.mock";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileService: ProfileService;
  let authService: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, BrowserModule, HttpClientTestingModule],
      declarations: [ProfileComponent],
      providers: [{ provide: ProfileService, useClass: ProfileServiceMock }, AuthService],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    authService = TestBed.inject(AuthService);
    router = TestBed.get(Router);
  });

  it('should create Profile component', () => {
    expect(component).toBeTruthy();
  });


  it('should set passwordInputType correctly', () => {
    component.profileForm.controls.showPassword.setValue(true);
    expect(component.passwordInputType).toBe('text');

    component.profileForm.controls.showPassword.setValue(false);
    expect(component.passwordInputType).toBe('password');
  });

  it('should load profile data on initialization', () => {
    const profileData: Profile = {
      firstName: 'Aaa',
      lastName: 'Bbb',
      email: 'ab@example.com',
      address: '123 Main St',
      phoneNumber: 1234567890,
      password: 'securePassword',
      notifications: true,
      photo: 'profile.jpg',
    };

    spyOn(authService, 'getUsername').and.returnValue('ab@example.com');
    spyOn(profileService, 'getProfile').and.returnValue(of(profileData));

    fixture.detectChanges();

    expect(profileService.getProfile).toHaveBeenCalledWith('ab@example.com');
    expect(component.profile).toEqual(profileData);
  });

  it('should disable form controls on disableForm method', () => {
    component.disableForm();

    Object.keys(component.profileForm.controls).forEach((controlName) => {
      const control = component.profileForm.get(controlName);
      expect(control?.disabled).toBeTruthy();
    });
  });

  it('should enable form controls on enableForm method', () => {
    component.enableForm();

    Object.keys(component.profileForm.controls).forEach((controlName) => {
      if (controlName !== 'email') {
        const control = component.profileForm.get(controlName);
        expect(control?.enabled).toBeTruthy();
      }
    });
  });

  it('should reset form fields on resetForm', () => {
    const profileData: Profile = {
      firstName: 'Aaa',
      lastName: 'Bbb',
      email: 'ab@example.com',
      address: '123 Main St',
      phoneNumber: 1234567890,
      password: 'securePassword',
      notifications: true,
      photo: 'profile.jpg',
    };

    spyOn(authService, 'getUsername').and.returnValue('ab@example.com');
    spyOn(profileService, 'getProfile').and.returnValue(of(profileData));
    fixture.detectChanges();

    component.profileForm.setValue({
      firstName: 'x',
      lastName: 'x',
      email: 'x@example.com',
      address: 'x',
      phone: '9876543210',
      city: 'x',
      state: 'x',
      password: 'x',
      showPassword: true,
      picture: null,
      notifications: false,
    });

    component.resetForm();

    expect(component.profileForm.controls.firstName.value).toEqual('Aaa');
    expect(component.profileForm.controls.lastName.value).toEqual('Bbb');
    expect(component.profileForm.controls.email.value).toEqual('ab@example.com');
    expect(component.profileForm.controls.address.value).toEqual('123 Main St');
    expect(component.profileForm.controls.phone.value).toEqual('1234567890');
    expect(component.profileForm.controls.notifications.value).toEqual(true);

  });


  it('should show error alert for invalid first name', () => {
    spyOn(window, 'alert');
    component.profileForm.controls['firstName'].setValue('123');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('First name should have only letters!.');
  });


  it('should show error alert for invalid last name', () => {
    spyOn(window, 'alert');
    component.profileForm.controls['lastName'].setValue('123');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Last name should have only letters!');
  });


  it('should show error alert for invalid address', () => {
    spyOn(window, 'alert');
    component.profileForm.controls['address'].setValue('!@#$');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Wrong format for address.');
  });


  it('should show error alert for invalid phone', () => {
    spyOn(window, 'alert');
    component.profileForm.controls['phone'].setValue('123abc');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Wrong format for phone.');
  });

  it('should call save method on valid form submission', () => {
    const mockProfileData: Profile = {
      firstName: 'Aaa',
      lastName: 'Bbb',
      email: 'ab@example.com',
      address: '123 Main St',
      phoneNumber: 1234567890,
      password: '',
      notifications: true,
      photo: '',
    };

    spyOn(authService, 'getUsername').and.returnValue('ab@example.com');
    spyOn(profileService, 'getProfile').and.returnValue(of(mockProfileData));
    spyOn(profileService, 'updateProfile').and.returnValue(of(mockProfileData));
    spyOn(component, 'loadFields').and.callThrough();
    spyOn(component, 'disableForm').and.callThrough();

    component.profileForm.controls['firstName'].setValue(mockProfileData.firstName);
    component.profileForm.controls['lastName'].setValue(mockProfileData.lastName);
    component.profileForm.controls['address'].setValue(mockProfileData.address);
    component.profileForm.controls['phone'].setValue(mockProfileData.phoneNumber.toString());
    component.profileForm.controls['password'].setValue(mockProfileData.password);
    component.profileForm.controls['showPassword'].setValue(false);
    component.profileForm.controls['notifications'].setValue(mockProfileData.notifications);
    component.selectedImageSrc = mockProfileData.photo;

    fixture.detectChanges();

    component.onSubmit();

    expect(profileService.updateProfile).toHaveBeenCalledWith(mockProfileData, 'ab@example.com');
    expect(component.loadFields).toHaveBeenCalled();
    expect(component.disableForm).toHaveBeenCalled();
    expect(component.editButtonsVisible).toBe(false);
  });


});
