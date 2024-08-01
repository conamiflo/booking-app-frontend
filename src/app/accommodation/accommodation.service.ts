import { Injectable } from '@angular/core';
import {Accommodation} from "./model/accommodation.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../env/env";
import {AccommodationTypeCheckBox} from "./model/accommodation-type.model";
import {Amenity} from "./model/amenity.model";
import {AccommodationType} from "./model/accommodationtype.model";
import {AmenityBackend} from "./model/amenity-backend.model";
import {AccommodationWithAmenities} from "./model/accommodation-with-amenities.model";
import {AccommodationDetails} from "./accommodation-creation/model/accomodationDetails.model";

import {ReservationBookingDtoModel} from "./model/reservation-booking-dto.model";
import {ReservationBookingResultDTO} from "./model/reservation-booking-result-dto.model";
import {Availability} from "./model/availability.model";
import {AccommodationIsAutomaticApprovalDto} from "./model/accommodation-is-automatic-approval-dto.model";
import {FavoriteAccommodationDTO} from "./model/favorite-accommodation-dto.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accommodationList: Accommodation[];
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<AccommodationWithAmenities[]>{
    return this.httpClient.get<AccommodationWithAmenities[]>(environment.apiHost + 'accommodations/amenities');
  }

  getAllInactiveAccommodations(): Observable<AccommodationDetails[]>{
    return this.httpClient.get<AccommodationDetails[]>(environment.apiHost + 'accommodations/inactive');
  }

  getActiveAccommodations(): Observable<AccommodationDetails[]>{
    return this.httpClient.get<AccommodationDetails[]>(environment.apiHost + 'accommodations/active');
  }

  activateAccommodation(accommodationId : number): void{
    console.log(environment.apiHost + 'accommodations/activate/' + accommodationId)
    this.httpClient.put<number>(environment.apiHost + 'accommodations/activate/' + accommodationId, accommodationId);
  }
  getAllAccommodations(): Observable<AccommodationWithAmenities[]>{
    return this.httpClient.get<AccommodationWithAmenities[]>(environment.apiHost + 'accommodations/amenities');
  }
  getAccommodation(id: number): Observable<Accommodation>{
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id);
  }
  getAccommodationById(id: number): Observable<AccommodationDetails>{
    return this.httpClient.get<AccommodationDetails>(environment.apiHost + 'accommodations/' + id);
  }
  createReservation(reservation: ReservationBookingDtoModel): Observable<ReservationBookingResultDTO> {
    return this.httpClient.post<ReservationBookingResultDTO>(environment.apiHost + 'reservations', reservation);
  }

  getAccommodationAvailability(accommodationId: number): Observable<Availability[]> {
    const url = `${environment.apiHost}availabilities/accommodation/${accommodationId}`;
    console.log("Ovo je url:" +url);
    return this.httpClient.get<Availability[]>(url);
  }

  searchAccommodations(guests?: number, location?: string, startDate?: number, endDate?: number): Observable<AccommodationWithAmenities[]> {
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
    return this.httpClient.get<AccommodationWithAmenities[]>(environment.apiHost + 'accommodations/search', { params });
  }

  filter(maximumPrice: number, minimumPrice: number, selectedAccommodationType: AccommodationTypeCheckBox[], amenities: Amenity[], accommodations: AccommodationWithAmenities[]): AccommodationWithAmenities[] {
    let filteredAccommodations: AccommodationWithAmenities[] = [];
    for (let i = 0; i < accommodations.length; i++){



      let validAccommodationType: boolean = false;
      for (let j = 0; j < selectedAccommodationType.length; j ++){
        if(!selectedAccommodationType[j].checked) continue;
        if(accommodations[i].type == selectedAccommodationType[j].value){
          validAccommodationType = true;
          break;
        }
      }

      if(!validAccommodationType) continue;


      let validAmenities = true;
      for( let j = 0; j < amenities.length; j ++){
        if(!amenities[j].checked) continue;

        let validEachAccommodationAmenity = false;

        for( let k = 0; k < accommodations[i].amenities.length; k ++){
          if(accommodations[i].amenities[k].id == amenities[j].id){
            validEachAccommodationAmenity = true;
            break;
          }
        }

        if(!validEachAccommodationAmenity){
          validAmenities = false;
          break;
        }

      }

      if(!validAmenities) continue;


      if(accommodations[i].defaultPrice > minimumPrice && accommodations[i].defaultPrice < maximumPrice){
        filteredAccommodations.push(accommodations[i]);
      }

    }


    return  filteredAccommodations;
  }



  getAllAmenitiesCheckBoxes() {
    return this.httpClient.get<AmenityBackend[]>(environment.apiHost + 'amenities');
  }

  getOwnersAccommodation(email: string): Observable<Accommodation[]>{
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations/owner/' + email)
  }

  setAccommodationIsAutomaticApproval(param: AccommodationIsAutomaticApprovalDto) : Observable<AccommodationIsAutomaticApprovalDto> {
    return this.httpClient.put<AccommodationIsAutomaticApprovalDto>(environment.apiHost+'accommodations/approval',param);
  }

  getAccommodationIsAutomaticApprovalById(id: number) {
    return this.httpClient.get<AccommodationIsAutomaticApprovalDto>(environment.apiHost + 'accommodations/'+id+'/approval');
  }
  getIsFavoriteAccommodation(email: string, accommodationId: number): Observable<FavoriteAccommodationDTO> {
    return this.httpClient.get<FavoriteAccommodationDTO>(environment.apiHost +'users/'+email+'/favorite_accommodation/'+accommodationId);
  }

  setFavoriteAccommodation(username: string, param: FavoriteAccommodationDTO): Observable<FavoriteAccommodationDTO>  {
    return this.httpClient.put<FavoriteAccommodationDTO>(environment.apiHost+'users/'+username+'/favorite_accommodation',param);
  }

  getFavoriteAccommodationsForGuest(username: string): Observable<AccommodationWithAmenities[]>{
  return this.httpClient.get<AccommodationWithAmenities[]>(environment.apiHost + 'users/' + username + "/favorite_accommodation");
}
}
