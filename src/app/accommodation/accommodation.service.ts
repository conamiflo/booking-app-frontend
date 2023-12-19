import { Injectable } from '@angular/core';
import {Accommodation} from "./model/accommodation.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accommodationList: Accommodation[];
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Accommodation[]>{
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations')
  }
  getAccommodation(id: number): Observable<Accommodation>{
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id)
  }
  searchAccommodations(guests?: number, location?: string, startDate?: string, endDate?: string): Observable<Accommodation[]> {
    let params = new HttpParams();

    if (guests) {
      params = params.set('guests', guests.toString());
    }
    if (location) {
      params = params.set('location', location);
    }
    if (startDate) {
      params = params.set('startDate', startDate); // Convert Date to YYYY-MM-DD format
    }
    if (endDate) {
      params = params.set('endDate', endDate); // Convert Date to YYYY-MM-DD format
    }
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations/search', { params });
  }
}
