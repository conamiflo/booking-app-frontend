import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersAccommodationsCardsComponent } from './owners-accommodations-cards.component';

describe('AccommodationCardsComponent', () => {
  let component: OwnersAccommodationsCardsComponent;
  let fixture: ComponentFixture<OwnersAccommodationsCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnersAccommodationsCardsComponent]
    });
    fixture = TestBed.createComponent(OwnersAccommodationsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
