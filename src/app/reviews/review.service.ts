import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {Amenity} from "./model/amenity.model";
import {Review} from "./review";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private httpClient: HttpClient) {}

  getReviewById(id: string): Observable<Review> {
    return this.httpClient.get<Review>(environment.apiHost + 'reviews/' +id );
  }

  getReviewsByOwnerEmail(email: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(environment.apiHost + 'reviews/owner/' + email);
  }

  getReviewsByAccommodationId(id: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(environment.apiHost + 'reviews/accommodation/' + id);
  }
  createReview(reviewDTO: Review): Observable<Review> {
    return this.httpClient.post<Review>(environment.apiHost + 'reviews', reviewDTO);
  }

  updateReview(id: string, reviewDTO: Review): Observable<Review> {
    return this.httpClient.put<Review>(environment.apiHost + 'reviews/' + id, reviewDTO);
  }

  deleteReview(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiHost + 'reviews/' + id);
  }

}
