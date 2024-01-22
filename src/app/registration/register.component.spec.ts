import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import {FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {RegistrationService} from "./registration.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserModule, By} from "@angular/platform-browser";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registrationServiceSpy: jasmine.SpyObj<RegistrationService>;

  beforeEach(async () => {

    registrationServiceSpy = jasmine.createSpyObj('RegistrationService', ['register']);
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule,FormsModule, ReactiveFormsModule, BrowserModule, HttpClientTestingModule],
      providers: [{ provide: RegistrationService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty fields initially', () => {
    expect(component.registrationForm.get('email')?.value).toEqual('');
    expect(component.registrationForm.get('password')?.value).toEqual('');
    expect(component.registrationForm.get('confirmPassword')?.value).toEqual('');
    expect(component.registrationForm.get('firstName')?.value).toEqual('');
    expect(component.registrationForm.get('lastName')?.value).toEqual('');
    expect(component.registrationForm.get('address')?.value).toEqual('');
    expect(component.registrationForm.get('phoneNumber')?.value).toEqual('');
  });

  it('should set form validity to false if passwords do not match', () => {
    component.registrationForm.setValue({
      email: 'nemanja@gmail.com',
      password: '123',
      confirmPassword: '1234',
      firstName: "Nemanja",
      lastName: "Stjepanovic",
      address: "Dunavska 4 Novi Sad",
      phoneNumber: "123123123",
      userType: "Guest"
    });
    expect(component.passwordsNotMatch()).toBeTrue();
    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeTruthy();
  });

  it('should set form validity to false if email is invalid', () => {
    component.registrationForm.setValue({
      email: 'nemanja',
      password: '123',
      confirmPassword: '123',
      firstName: "Nemanja",
      lastName: "Stjepanovic",
      address: "Dunavska 4 Novi Sad",
      phoneNumber: "123123123",
      userType: "Guest"
    });
    fixture.detectChanges();
    expect(component.passwordsNotMatch()).toBeFalse();
    expect(component.registrationForm.valid).toBeFalse();
    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeTruthy();
  });

  it('should set form validity to false if first name is invalid', () => {
    component.registrationForm.setValue({
      email: 'nemanja@gmail.com',
      password: '123',
      confirmPassword: '123',
      firstName: "Nemanja124",
      lastName: "Stjepanovic",
      address: "Dunavska 4 Novi Sad",
      phoneNumber: "123123123",
      userType: "Guest"
    });
    fixture.detectChanges();
    expect(component.passwordsNotMatch()).toBeFalse();
    expect(component.registrationForm.valid).toBeFalse();
    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeTruthy();
  });

  it('should set form validity to false if last name is invalid', () => {
    component.registrationForm.setValue({
      email: 'nemanja@gmail.com',
      password: '123',
      confirmPassword: '123',
      firstName: "Nemanja",
      lastName: "Stjepanovic123",
      address: "Dunavska 4 Novi Sad",
      phoneNumber: "123123123",
      userType: "Guest"
    });

    fixture.detectChanges();
    expect(component.passwordsNotMatch()).toBeFalse();
    expect(component.registrationForm.valid).toBeFalse();
    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeTruthy();
  });

  it('should set form validity to false if first name is invalid', () => {
    component.registrationForm.setValue({
      email: 'nemanja@gmail.com',
      password: '123',
      confirmPassword: '123',
      firstName: "Nemanja124",
      lastName: "Stjepanovic",
      address: "Dunavska 4 Novi Sad",
      phoneNumber: "123123123",
      userType: "Guest"
    });

    fixture.detectChanges();
    expect(component.passwordsNotMatch()).toBeFalse();
    expect(component.registrationForm.valid).toBeFalse();
    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeTruthy();
  });

  it('should set form validity to false if phone number is invalid', () => {
    component.registrationForm.setValue({
      email: 'nemanja@gmail.com',
      password: '123',
      confirmPassword: '123',
      firstName: "Nemanja",
      lastName: "Stjepanovic",
      address: "Dunavska 4 Novi Sad",
      phoneNumber: "123123123aa",
      userType: "Guest"
    });

    fixture.detectChanges();
    expect(component.passwordsNotMatch()).toBeFalse();
    expect(component.registrationForm.valid).toBeFalse();
    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeTruthy();
  });

  it('should set form validity to false if role is invalid', () => {
    component.registrationForm.setValue({
      email: 'nemanja@gmail.com',
      password: '123',
      confirmPassword: '123',
      firstName: "Nemanja",
      lastName: "Stjepanovic",
      address: "Dunavska 4 Novi Sad",
      phoneNumber: "123123123",
      userType: ""
    });

    fixture.detectChanges();
    expect(component.passwordsNotMatch()).toBeFalse();
    expect(component.registrationForm.valid).toBeFalse();
    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeTruthy();
  });

  it('should set form validity to true', () => {
    component.registrationForm.setValue({
      email: 'nemanja@gmail.com',
      password: '123',
      confirmPassword: '123',
      firstName: "Nemanja",
      lastName: "Stjepanovic",
      address: "Dunavska 4 Novi Sad",
      phoneNumber: "123123123",
      userType: "Guest"
    });

    fixture.detectChanges();
    expect(component.passwordsNotMatch()).toBeFalse();
    expect(component.registrationForm.valid).toBeTrue();
    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeFalse();
  });

  it('should change selected radio button to Owner', () => {
    component.registrationForm.get('userType')?.setValue('Owner');
    expect(component.registrationForm.get('userType')?.value).toBe('Owner');

    const guestRadioButton = fixture.debugElement.query(By.css('.guestradio input')).nativeElement;
    const ownerRadioButton = fixture.debugElement.query(By.css('.ownerradio input')).nativeElement;
    expect(guestRadioButton.checked).toBeFalse();
    expect(ownerRadioButton.checked).toBeTrue();
  });

  it('should change selected radio button to Guest', () => {
    fixture.detectChanges();
    component.registrationForm.get('userType')?.setValue('Guest');
    expect(component.registrationForm.get('userType')?.value).toBe('Guest');

    const guestRadioButton = fixture.debugElement.query(By.css('.guestradio input')).nativeElement;
    const ownerRadioButton = fixture.debugElement.query(By.css('.ownerradio input')).nativeElement;
    expect(guestRadioButton.checked).toBeTrue();
    expect(ownerRadioButton.checked).toBeFalse();
  });

  it('should be invalid when no radio button is selected', () => {
    component.registrationForm.get('userType')?.setValue(null);
    expect(component.registrationForm.get('userType')?.value).toBeNull();
    expect(component.registrationForm.valid).toBeFalse();
  });

  it('should call onSubmit method when the sign-up button is clicked and the form is valid', () => {

    component.registrationForm.setValue({
      email: 'nemanja@gmail.com',
      password: '123',
      confirmPassword: '123',
      firstName: 'Nemanja',
      lastName: 'Stjepanovic',
      address: 'Dunavska 4 Novi Sad',
      phoneNumber: '123123123',
      userType: 'Guest',
    });
    fixture.detectChanges();
    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeFalse();
    const onSubmitSpy = spyOn(component, 'onSubmit').and.callThrough();
    signUpButton.nativeElement.click();
    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should call register method when the sign-up button is clicked and the form is valid', () => {
    component.registrationForm.setValue({
      email: 'nemanja@gmail.com',
      password: '123',
      confirmPassword: '123',
      firstName: 'Nemanja',
      lastName: 'Stjepanovic',
      address: 'Dunavska 4 Novi Sad',
      phoneNumber: '123123123',
      userType: 'Guest',
    });

    fixture.detectChanges();

    const signUpButton = fixture.debugElement.query(By.css('#sign-up-btn'));
    expect(signUpButton.nativeElement.disabled).toBeFalse();

    const registerServiceSpy = spyOn(component.registerService, 'register').and.callThrough();
    signUpButton.nativeElement.click();

    expect(registerServiceSpy).toHaveBeenCalled();

    expect(registerServiceSpy).toHaveBeenCalledWith({
      email: 'nemanja@gmail.com',
      password: '123',
      isActive: false,
      name: 'Nemanja',
      lastName: 'Stjepanovic',
      address: 'Dunavska 4 Novi Sad',
      phoneNumber: '123123123',
      role: 'Guest'
    });

  });


});
