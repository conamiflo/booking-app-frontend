import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { of } from 'rxjs';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY, MAT_DIALOG_DATA } from "@angular/material/dialog";
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

describe('AccommodationDetailsComponent', () => {
  let component: AccommodationDetailsComponent;
  let fixture: ComponentFixture<AccommodationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailsComponent],
      imports: [HttpClientTestingModule, CommonModule, OverlayModule],
      providers: [
        DatePipe,
        AccommodationService,
        MapService,
        ReviewService,
        AuthService,
        NotificationService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'your-expected-param-value' } } } },
        {
          provide: MatDialog,
          useValue: {
            open: (component: ComponentType<any>, config?: any) => {},
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: (overlay: Overlay, injector: Injector) => {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccommodationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
