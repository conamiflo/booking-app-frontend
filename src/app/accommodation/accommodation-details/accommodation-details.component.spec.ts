import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { of } from 'rxjs';
import {MatDialog, MAT_DIALOG_SCROLL_STRATEGY, MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

import { AccommodationDetailsComponent } from './accommodation-details.component';
import { AccommodationService } from "../accommodation.service";
import { MapService } from "../../shared/map/map.service";
import { ReviewService } from "../../reviews/review.service";
import { AuthService } from "../../authentication/auth.service";
import { NotificationService } from "../../notifications/notification.service";
import { DatePipe } from "@angular/common";
import {Injector} from "@angular/core";
import { BrowserModule, By } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';



describe('AccommodationDetailsComponent', () => {
  let component: AccommodationDetailsComponent;
  let fixture: ComponentFixture<AccommodationDetailsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailsComponent],
      imports: [
        HttpClientTestingModule,
        CommonModule,
        OverlayModule,
        MatDialogModule,
        NgbModule,
        SharedModule],
      providers: [
        DatePipe,
        AccommodationService,
        MapService,
        ReviewService,
        AuthService,
        NotificationService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'your-expected-param-value' } } } },
        ],
    }).compileComponents();
    fixture = TestBed.createComponent(AccommodationDetailsComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController)
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
