import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../env/env";
import {Registration} from "./model/registration.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  constructor(private http: HttpClient) {}

  register(registration: Registration): Observable<Registration>{
    return this.http.post<Registration>(environment.apiHost + 'users/register', registration, {
      headers: this.headers,
    });
  }


}
