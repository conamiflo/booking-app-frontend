import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {GuestReservation} from "./guest-reservation/model/reservation.model";
import {OwnerReservationModel} from "./owner-reservation/owner-reservation.model";
import {NumberOfCancellationsModel} from "./owner-reservation/number-of-cancelations.model";
import {AccommodationNumberReservations} from "./profit-statistics/models/accommodation-number-reservations.model";
import {AccommodationProfit} from "./profit-statistics/models/accommodation-profit.model";
import {AccommodationYearlyReservations} from "./profit-statistics/models/accommodation-yearly-reservations.model";
import {AccommodationYearlyProfit} from "./profit-statistics/models/accommodation-yearly-profit.model";
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<GuestReservation[]>{
    return this.httpClient.get<GuestReservation[]>(environment.apiHost + 'reservations')
  }
  getReservationsByAccommodationId(id: number): Observable<GuestReservation[]>{
    return this.httpClient.get<GuestReservation[]>(environment.apiHost + 'reservations/accommodation/' + id);
  }
  getGuestReservations(email:string): Observable<GuestReservation[]>{
    return this.httpClient.get<GuestReservation[]>(environment.apiHost + 'reservations/guest/' + email)
  }

  getOwnerReservations(email:string): Observable<OwnerReservationModel[]>{
    return this.httpClient.get<OwnerReservationModel[]>(environment.apiHost + 'reservations/owner/' + email)
  }

  acceptReservation(id:number): Observable<OwnerReservationModel>{
    return this.httpClient.put<OwnerReservationModel>(environment.apiHost + 'reservations/accept/' + id, {})
  }

  declineReservation(id:number): Observable<OwnerReservationModel>{
    return this.httpClient.put<OwnerReservationModel>(environment.apiHost + 'reservations/decline/' + id, {})
  }


  cancelReservation(id:number): Observable<GuestReservation>{
    return this.httpClient.put<GuestReservation>(environment.apiHost + 'reservations/cancel/' + id, {})
  }


  deleteReservation(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiHost +"reservations/"+id);
  }

  searchGuestsReservations(
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

  searchOwnersReservations(
    startDate: number | undefined,
    endDate: number | undefined,
    accommodationName: string | undefined,
    email: string
  ): Observable<OwnerReservationModel[]> {
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
    return this.httpClient.get<OwnerReservationModel[]>(
      environment.apiHost + 'reservations/owner/search',
      { params: params }
    );
  }
  getNumberOfCancellations(guestId: string): Observable<NumberOfCancellationsModel> {

    return this.httpClient.get<NumberOfCancellationsModel>(environment.apiHost+'reservations/guest/'+guestId+'/cancellations', );
  }

  getNumberOfReservations(startDate: number, endDate: number, username: string): Observable<AccommodationNumberReservations[]> {
    let params = new HttpParams();

    if (startDate) {
      params = params.set('startDate', startDate.toString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toString());
    }
    if (username) {
      params = params.set('username', username);
    }

    const options = { params: params };

    return this.httpClient.get<AccommodationNumberReservations[]>(environment.apiHost+"reservations/statistics/number_of_reservations", options);
  }

  getStatisticsProfit(startDate: number, endDate: number, username: string): Observable<AccommodationProfit[]> {
    let params = new HttpParams();

    if (startDate) {
      params = params.set('startDate', startDate.toString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toString());
    }
    if (username) {
      params = params.set('username', username);
    }

    const options = { params: params };

    return this.httpClient.get<AccommodationProfit[]>(environment.apiHost+"reservations/statistics/profit", options);
  }

    getYearlyNumberOfReservations(selectedYear: number, username: string): Observable<AccommodationYearlyReservations[]> {
    let params = new HttpParams();

    if (selectedYear) {
      params = params.set('year', selectedYear.toString());
    }
    if (username) {
      params = params.set('username', username);
    }

    const options = { params: params };

    return this.httpClient.get<AccommodationYearlyReservations[]>(environment.apiHost+"reservations/statistics/yearly_number_of_reservations", options);
  }

  getYearlyProfit(selectedYear: number, username: string): Observable<AccommodationYearlyProfit[]> {
    let params = new HttpParams();

    if (selectedYear) {
      params = params.set('year', selectedYear.toString());
    }
    if (username) {
      params = params.set('username', username);
    }

    const options = { params: params };

    return this.httpClient.get<AccommodationYearlyProfit[]>(environment.apiHost+"reservations/statistics/yearly_profit", options);
  }

  downloadPdf(startDate: number, endDate: number, selectedYear: number | null, username: string): Observable<Blob> {
    let params = new HttpParams();

    if (startDate) {
      params = params.set('startDate', startDate.toString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toString());
    }
    if (selectedYear) {
      params = params.set('year', selectedYear.toString());
    }
    if (username) {
      params = params.set('username', username);
    }

    const options = { params: params, responseType: 'blob' as 'json' };

    return this.httpClient.get<Blob>(environment.apiHost + 'reservations/statistics/pdf', options);
  }
}
