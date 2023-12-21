import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
// @ts-ignore
import {Amenity} from "./model/amenity.model";
import {Accommodation} from "../model/accommodation.model";
import {AccommodationRequest} from "./model/accommodation.request.model";


@Injectable({
  providedIn: 'root'
})
export class AccommodationRequestService {
  constructor(private httpClient: HttpClient) {}
  createAccommodationRequest(accReq: AccommodationRequest): Observable<AccommodationRequest>{
    console.log(accReq)
    return this.httpClient.post<AccommodationRequest>(environment.apiHost + 'accommodationRequests', accReq);
  }
  getAccommodationRequests(): Observable<AccommodationRequest[]>{
    return this.httpClient.get<AccommodationRequest[]>(environment.apiHost + 'accommodationRequests');
  }

}
