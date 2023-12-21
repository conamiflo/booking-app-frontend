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

  createAccommodation(a: Accommodation): Observable<Accommodation>{
    console.log(a);
    return this.httpClient.post<Accommodation>(environment.apiHost + 'accommodations', a);
  }

  addAmenity(a: Amenity, id: string){
    return this.httpClient.put<Accommodation>(environment.apiHost + 'accommodations/' + id + "/amenity/" + a.id, {});
  }

  addPrice(pr: Price, id: string){
    const ts: TimeSlot = {startDate: new Date(pr.from), endDate: new Date(pr.to)}
    const p: PricePost = {timeSlot: ts, price: Number(pr.price)}
    return this.httpClient.post<Accommodation>(environment.apiHost + 'accommodations/' + id + '/price', p);
  }

  addAvailability(a: Availability, id: string){
    const av : AvailabilityPost = {startDate: new Date(a.from), endDate: new Date(a.to), id: 0}
    return this.httpClient.post<AvailabilityPost>(environment.apiHost + 'availabilities/accommodation/' + id, av);
  }
}
