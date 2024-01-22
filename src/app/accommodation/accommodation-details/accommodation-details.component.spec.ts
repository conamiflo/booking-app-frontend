import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CommonModule, DatePipe} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {of, throwError} from 'rxjs';
import {MatDialogModule} from "@angular/material/dialog";
import {OverlayModule} from '@angular/cdk/overlay';

import {AccommodationDetailsComponent} from './accommodation-details.component';
import {AccommodationService} from "../accommodation.service";
import {MapService} from "../../shared/map/map.service";
import {ReviewService} from "../../reviews/review.service";
import {AuthService} from "../../authentication/auth.service";
import {NotificationService} from "../../notifications/notification.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';


import {HttpClient} from '@angular/common/http';
import {ReservationBookingResultDTO, ReservationStatus} from "../model/reservation-booking-result-dto.model";
import {Notification} from "../../notifications/notification";
import {NotificationType} from "../../notifications/notification.type";
import {AccommodationDetails} from "../accommodation-creation/model/accomodationDetails.model";
import {PriceType} from "../accommodation-creation/model/price-type.model";
import {AccommodationStatus} from "../accommodation-creation/model/accommodation.status";


describe('AccommodationDetailsComponent', () => {
  let component: AccommodationDetailsComponent;
  let fixture: ComponentFixture<AccommodationDetailsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let accommodationService: AccommodationService;
  let authService: AuthService;
  let notificationService: NotificationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailsComponent],
      imports: [
        HttpClientTestingModule,
        CommonModule,
        OverlayModule,
        MatDialogModule,
        NgbModule,
        SharedModule],
      providers: [
        DatePipe,
        AccommodationService,
        MapService,
        ReviewService,
        AuthService,
        NotificationService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'your-expected-param-value' } } } },
        ],
    }).compileComponents();
    fixture = TestBed.createComponent(AccommodationDetailsComponent);
    component = fixture.componentInstance;
    accommodationService = TestBed.inject(AccommodationService);
    authService = TestBed.inject(AuthService);
    notificationService = TestBed.inject(NotificationService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController)

    component.accommodation = {
      id: 1,
      ownerEmail: 'owner@example.com',
      name: 'Example Accommodation',
      description: 'A sample accommodation',
      location: 'Sample location',
      defaultPrice: 100,
      photos: ['photo1.jpg', 'photo2.jpg'],
      minGuests: 1,
      maxGuests: 5,
      created: Date.now(),
      type: 'Apartment',
      priceType: PriceType.PerNight,
      status: AccommodationStatus.Active,
      cancellationDays: 7,
    };

    // fixture.detectChanges();
  });

  it('should create accommodation details component', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.checkInDate;

    expect(component).toBeTruthy();
  });

  it('should book reservation successfully', fakeAsync(() => {
    // Mock data
    component.checkInDate = new Date();
    component.checkOutDate = new Date();
    component.numberOfGuests = 2;

    const reservationResult: ReservationBookingResultDTO = {
      id: 1,
      accommodation: 'Accommodation a',
      guest: 'john.doe@example.com',
      startDate: '1643539200',
      endDate: '1643721600',
      numberOfGuests: 2,
      status: ReservationStatus.Accepted,
      price: 100,
    };
    const notificationResult : Notification = new class implements Notification {
      id: number;
      message: string;
      receiverEmail: string;
      type: NotificationType;
    };
    notificationResult.id = 1;
    notificationResult.message = "test";
    notificationResult.receiverEmail = "test@gmail.com";
    notificationResult.type = NotificationType.CREATE_RESERVATIONS;


    spyOn(component, 'loadAvailabilities'); // Spy on the method called after successful booking

    spyOn(authService, 'getUsername').and.returnValue('john.doe@example.com');
    spyOn(authService, 'getRole').and.returnValue('Guest');

    spyOn(accommodationService, 'createReservation').and.returnValue(of(reservationResult));

    spyOn(notificationService, 'createNotification').and.returnValue(of(notificationResult));

    component.bookReservation(new MouseEvent('click'));

    tick();

    expect(accommodationService.createReservation).toHaveBeenCalledOnceWith(jasmine.any(Object));
    expect(notificationService.createNotification).toHaveBeenCalledTimes(2); 
    expect(component.loadAvailabilities).toHaveBeenCalled();

    expect(component.checkInDate).toBeNull();
    expect(component.checkOutDate).toBeNull();

  }));

  it('should handle booking error', fakeAsync(() => {

    component.checkInDate = new Date();
    component.checkOutDate = new Date();
    component.numberOfGuests = 2;

    spyOn(authService, 'getUsername').and.returnValue('john.doe@example.com');
    spyOn(authService, 'getRole').and.returnValue('Guest');

    spyOn(accommodationService, 'createReservation').and.returnValue(throwError('Booking error'));

    spyOn(window, 'alert');


    component.bookReservation(new MouseEvent('click'));

    tick();

    expect(accommodationService.createReservation).toHaveBeenCalledOnceWith(jasmine.any(Object));
    expect(window.alert).toHaveBeenCalledWith('You cannot book that reservation!');

  }));

  it('should log a message if date strings are null', () => {
    spyOn(console, 'log'); // Spy on console.log to check if it's called

    // Set date strings to null
    component.checkInDate = null;
    component.checkOutDate = null;
    component.numberOfGuests = 2; // Set other required properties as needed

    // Trigger the method
    component.bookReservation(new MouseEvent('click'));

    // Check if the console.log was called with the expected message
    expect(console.log).toHaveBeenCalledWith('One or both strings are null or empty.');

    // Add more expectations based on your specific logic
  });

  it('should alert if beginning date is after end date', fakeAsync(() => {
    spyOn(window, 'alert');

    component.checkInDate = new Date('2022-01-25');
    component.checkOutDate = new Date('2022-01-20');
    component.numberOfGuests = 2;

    component.bookReservation(new MouseEvent('click'));

    expect(window.alert).toHaveBeenCalledWith('Reservation cannot be made with those dates! ');
  }));

  it('should alert if number of guests is below the valid range', fakeAsync(() => {
    spyOn(window, 'alert');

    component.checkInDate = new Date('2022-01-15');
    component.checkOutDate = new Date('2022-01-20');
    component.numberOfGuests = component.accommodation.minGuests - 1;

    component.bookReservation(new MouseEvent('click'));

    expect(window.alert).toHaveBeenCalledWith('Reservation cannot be made for that number of guests! ');
  }));

  it('should alert if number of guests is above the valid range', fakeAsync(() => {
    spyOn(window, 'alert');

    component.checkInDate = new Date('2022-01-15');
    component.checkOutDate = new Date('2022-01-20');
    component.numberOfGuests = component.accommodation.maxGuests + 1;

    component.bookReservation(new MouseEvent('click'));

    expect(window.alert).toHaveBeenCalledWith('Reservation cannot be made for that number of guests! ');

  }));


  it('should alert if user role is not "Guest"', fakeAsync(() => {
    spyOn(window, 'alert');

    spyOn(authService, 'getRole').and.returnValue('Admin');

    component.checkInDate = new Date('2022-01-15');
    component.checkOutDate = new Date('2022-01-20');
    component.numberOfGuests = 2;

    component.bookReservation(new MouseEvent('click'));

    expect(window.alert).toHaveBeenCalledWith('You are not authorized to make reservations, make guest account! ');
  }));


});
