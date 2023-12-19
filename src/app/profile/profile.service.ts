import { Injectable } from '@angular/core';
import {Profile} from "./model/profile.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  getProfile(email : String): Observable<Profile>{
    return this.httpClient.get<Profile>(environment.apiHost + 'users/' + email);
  }

  updateProfile(profile : Profile, email : String): Observable<Profile>{
    return this.httpClient.put<Profile>(environment.apiHost + 'users/' + email + '/update', profile);
  }

  deleteProfile(email: string) {
    this.httpClient.delete(environment.apiHost + 'users/' + email).subscribe({
      next: data => {
        alert('Delete successful');
      },
      error: error => {

          alert('There was an error!' + error);
      }
    });
  }
}
