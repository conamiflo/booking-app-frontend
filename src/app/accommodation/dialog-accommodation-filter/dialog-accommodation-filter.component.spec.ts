import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccommodationFilterComponent } from './dialog-accommodation-filter.component';

describe('DialogAccommodationFilterComponent', () => {
  let component: DialogAccommodationFilterComponent;
  let fixture: ComponentFixture<DialogAccommodationFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAccommodationFilterComponent]
    });
    fixture = TestBed.createComponent(DialogAccommodationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
