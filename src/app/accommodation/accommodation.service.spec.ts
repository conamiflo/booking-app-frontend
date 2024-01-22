import { TestBed, inject } from '@angular/core/testing';
import { AccommodationService } from './accommodation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationBookingDtoModel } from './model/reservation-booking-dto.model';
import { ReservationBookingResultDTO, ReservationStatus } from './model/reservation-booking-result-dto.model';
import { environment } from '../../env/env';

describe('AccommodationService', () => {
  let service: AccommodationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccommodationService]
    });

    service = TestBed.inject(AccommodationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should create a reservation', () => {
    const reservation: ReservationBookingDtoModel = {
      id: 0,
      accommodation: 1,
      guest: 'john.doe@example.com',
      startDate: new Date('2024-01-01').getTime(),
      endDate: new Date('2024-01-10').getTime(),
      numberOfGuests: 2
    };

    const expectedResult: ReservationBookingResultDTO = {
      id: 1,
      accommodation: 'Accommodation Name',
      guest: 'john.doe@example.com',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
      numberOfGuests: 2,
      status: ReservationStatus.Accepted,
      price: 100
    };
    //act
    service.createReservation(reservation).subscribe(result => {

    //assert
      expect(result).toEqual(expectedResult);
    });

    const req = httpTestingController.expectOne({
      url: `${environment.apiHost}reservations`
    }
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(reservation);

    req.flush(expectedResult);
  });
});
