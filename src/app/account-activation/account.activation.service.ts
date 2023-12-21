import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
@Injectable({
  providedIn: 'root'
})
export class AccountActivationService {
  constructor(private httpClient: HttpClient) {}
  activateAccount(email: string){
    return this.httpClient.get<void>(environment.apiHost + 'users/activation/' + email)
  }

}
