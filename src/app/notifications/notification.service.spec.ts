import {TestBed} from '@angular/core/testing';
import {NotificationService} from './notification.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../env/env';
import {Notification} from "./notification";
import {NotificationType} from "./notification.type";

describe('NotificationService', () => {
  let service: NotificationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService]
    });

    service = TestBed.inject(NotificationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a notification for the user', () => {
    const email: string = 'test@gmail.com';

    const notificationData : Notification = {
      id: 1,
      receiverEmail: email,
      type: NotificationType.CREATE_RESERVATIONS,
      message: 'Test notification message',
    };

    service.createNotification(notificationData).subscribe((createdNotification) => {
      expect(createdNotification).toEqual({
        id: 1,
        receiverEmail: email,
        type: notificationData.type,
        message: notificationData.message,
      });
    });

    const req = httpTestingController.expectOne({
      url: `${environment.apiHost}notifications`,
      method: 'POST',
    });

    expect(req.request.body).toEqual(notificationData);

    const mockedResponse: Notification = {
      id: 1,
      receiverEmail: email,
      type: notificationData.type,
      message: notificationData.message,
    };

    req.flush(mockedResponse);
  });
});
