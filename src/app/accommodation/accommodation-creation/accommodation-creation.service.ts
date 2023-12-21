import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
// @ts-ignore
import {Amenity} from "./model/amenity.model";
import {Accommodation} from "../model/accommodation.model";
import {AccommodationType} from "./model/accommodation-type.model";
import {TimeSlot} from "./model/time-slot.model";
import {PricePost} from "./model/price-post.model";
import {Price} from "./model/price.model";
import {Availability} from "./model/availability.model";
import {AvailabilityPost} from "./model/availability-post.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationCreationService {
  constructor(private httpClient: HttpClient) {}

  getAllAmmenities(): Observable<Amenity[]>{
    return this.httpClient.get<Amenity[]>(environment.apiHost + 'amenities');
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

  uploadPictures(formData: FormData){
    return this.httpClient.post<string[]>(environment.apiHost+"files/upload", formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
