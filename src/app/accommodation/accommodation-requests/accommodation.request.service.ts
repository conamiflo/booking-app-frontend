import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
// @ts-ignore
import {Amenity} from "./model/amenity.model";
import {Accommodation} from "../model/accommodation.model";


@Injectable({
  providedIn: 'root'
})
export class AccommodationRequestService {
  constructor(private httpClient: HttpClient) {}

  // getAllAmmenities(): Observable<Amenity[]>{
  //   return this.httpClient.get<Amenity[]>(environment.apiHost + 'amenities');
  // }
  //
  // createAccommodation(a: Accommodation): Observable<Accommodation>{
  //   console.log(a);
  //   return this.httpClient.post<Accommodation>(environment.apiHost + 'accommodations', a);
  // }
  //

}
