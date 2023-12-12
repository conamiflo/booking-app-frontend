import { Injectable } from '@angular/core';
import {Profile} from "./model/profile.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
}
