import { Injectable } from '@angular/core';
import {Accommodation} from "./model/accommodation.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accommodationList: Accommodation[] = [];
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Accommodation[]>{
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations')
  }
  getAccommodation(id: number): Observable<Accommodation>{
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id)
  }

}
