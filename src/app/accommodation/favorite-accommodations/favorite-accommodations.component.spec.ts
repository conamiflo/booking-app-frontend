import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteAccommodationsComponent } from './favorite-accommodations.component';

describe('FavoriteAccommodationsComponent', () => {
  let component: FavoriteAccommodationsComponent;
  let fixture: ComponentFixture<FavoriteAccommodationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteAccommodationsComponent]
    });
    fixture = TestBed.createComponent(FavoriteAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
