import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../env/env";
import {Report} from "./report";
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${environment.apiHost}reports`);
  }

  getReportById(id: number): Observable<Report> {
    return this.httpClient.get<Report>(`${environment.apiHost}reports/${id}`);
  }

  createReport(reportDTO: Report): Observable<Report> {
    return this.httpClient.post<Report>(`${environment.apiHost}reports`, reportDTO);
  }

  updateReport(id: number, reportDTO: Report): Observable<Report> {
    return this.httpClient.put<Report>(`${environment.apiHost}reports/${id}`, reportDTO);
  }

  deleteReport(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiHost}reports/${id}`);
  }

  getOwnersForGuestReport(guestEmail: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiHost}users/owners/${guestEmail}`);
  }

  getGuestsForOwnerReport(ownerEmail: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiHost}users/guests/${ownerEmail}`);
  }

  blockUser(userEmail: string): Observable<void>{
    return this.httpClient.put<void>(`${environment.apiHost}users/${userEmail}/block`, {});
  }

}
