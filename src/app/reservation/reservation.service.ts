import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {GuestReservation} from "./guest-reservation/model/reservation.model";
import {OwnerReservation} from "./owner-reservation/owner.reservation";
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<GuestReservation[]>{
    return this.httpClient.get<GuestReservation[]>(environment.apiHost + 'reservations')
  }
  getGuestReservations(email:string): Observable<GuestReservation[]>{
    return this.httpClient.get<GuestReservation[]>(environment.apiHost + 'reservations/guest/' + email)
  }

  getOwnerReservations(email:string): Observable<OwnerReservation[]>{
    return this.httpClient.get<OwnerReservation[]>(environment.apiHost + 'reservations/owner/' + email)
  }

  acceptReservation(id:number): Observable<OwnerReservation>{
    return this.httpClient.put<OwnerReservation>(environment.apiHost + 'reservations/accept/' + id, {})
  }

  declineReservation(id:number): Observable<OwnerReservation>{
    return this.httpClient.put<OwnerReservation>(environment.apiHost + 'reservations/decline/' + id, {})
  }

  deleteReservation(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiHost +"reservations/"+id);
  }

  searchOwnerReservations(
    startDate: number | undefined,
    endDate: number | undefined,
    accommodationName: string | undefined,
    email: string
  ): Observable<GuestReservation[]> {
    // Build the query parameters
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate.toString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toString());
    }
    if (accommodationName) {
      params = params.set('accommodationName', accommodationName);
    }

    // Add the 'email' parameter to the request
    params = params.set('email', email);

    // Make the HTTP GET request
    return this.httpClient.get<GuestReservation[]>(
      environment.apiHost + 'reservations/guest/search',
      { params: params }
    );
  }

}
