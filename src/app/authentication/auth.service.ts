import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../env/env";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthResponse} from "./model/auth-response.model";
import {Login} from "./model/login.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(auth: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost + 'auth/logIn', auth, {
      headers: this.headers,
    });
  }

  logout(): Observable<string> {
    return this.http.post(environment.apiHost + 'auth/logOut', {}, {
      responseType: 'text',
    });
  }

  getRole(): string {
    if (this.isLoggedIn()) {
      const accessToken: string | null = localStorage.getItem('user');

      if(accessToken === null){
        return "unauthorized";
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(accessToken);

      if (decodedToken && decodedToken.role && decodedToken.role.length > 0) {
        return decodedToken.role;
      }
    }
    return "unauthorized";
  }

  getUsername(): string {
    if (this.isLoggedIn()) {
      const accessToken: string | null = localStorage.getItem('user');

      if (accessToken === null) {
        return "unauthorized";
      }

      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(accessToken);

      if (decodedToken && decodedToken.sub) {
        return decodedToken.sub; // Assuming 'sub' represents the username in your token
      }
    }
    return "unauthorized";
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  isGuest(): boolean{
    return this.getRole() === "Guest";
  }

}
