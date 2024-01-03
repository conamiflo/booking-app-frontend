import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
// @ts-ignore
import {Amenity} from "./model/amenity.model";
import {Accommodation} from "../model/accommodation.model";
import {Price} from "../accommodation-creation/model/price.model";
import {TimeSlot} from "../accommodation-creation/model/time-slot.model";
import {PricePost} from "../accommodation-creation/model/price-post.model";
import {Availability} from "../accommodation-creation/model/availability.model";
import {AvailabilityPost} from "../accommodation-creation/model/availability-post.model";
import {AmenityBackend} from "../model/amenity-backend.model";
import {AccommodationDetails} from "../accommodation-creation/model/accomodationDetails.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationEditService {
  constructor(private httpClient: HttpClient) {}

  getAllAmmenities(): Observable<Amenity[]>{
    return this.httpClient.get<Amenity[]>(environment.apiHost + 'amenities');
  }

  updateAccommodation(a: Accommodation, accommodationId : number): Observable<Accommodation>{
    return this.httpClient.put<Accommodation>(environment.apiHost + 'accommodations/' + accommodationId, a);
  }
  removeAccommodationAmenities(accommodationId: number): void {
    this.httpClient.delete(environment.apiHost + 'accommodations/amenities/' + accommodationId);
  }

  getAmenitiesByAccommodationId(accommodationId : number) :Observable<Amenity[]>{
    return this.httpClient.get<Amenity[]>(environment.apiHost + 'accommodations/' + accommodationId + '/amenity');
  }

  getAvailabilitiesByAccommodationId(accommodationId : number) :Observable<Availability[]>{
    return this.httpClient.get<Availability[]>(environment.apiHost + 'availabilities/available/' + accommodationId);
  }
  getPricesByAccommodationId(accommodationId : number) :Observable<Price[]>{
  return this.httpClient.get<Price[]>(environment.apiHost + 'accommodations/prices/' + accommodationId);
  }

  activateAccommodation(id: number) {
    return this.httpClient.put<void>(environment.apiHost + "accommodations/activate/"+id, {});
  }
}
