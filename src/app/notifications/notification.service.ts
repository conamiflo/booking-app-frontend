import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {Notification} from "./notification";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private httpClient: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(`${environment.apiHost}notifications`);
  }

  getUsersNotifications(email: String): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(`${environment.apiHost}notifications/user/`+email);
  }

  getNotificationById(id: number): Observable<Notification> {
    return this.httpClient.get<Notification>(`${environment.apiHost}notifications/${id}`);
  }

  createNotification(notificationDTO: Notification): Observable<Notification> {
    return this.httpClient.post<Notification>(`${environment.apiHost}notifications`, notificationDTO);
  }

  updateNotification(id: number, notificationDTO: Notification): Observable<Notification> {
    return this.httpClient.put<Notification>(`${environment.apiHost}notifications/${id}`, notificationDTO);
  }

  deleteNotification(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiHost}notifications/${id}`);
  }
}
