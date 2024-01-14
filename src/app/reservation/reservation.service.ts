import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  cancelReservation(id:number): Observable<GuestReservation>{
    return this.httpClient.put<GuestReservation>(environment.apiHost + 'reservations/cancel/' + id, {})
  }

}
