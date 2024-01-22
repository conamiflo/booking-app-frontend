import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccommodationDetailsComponent } from './accommodation-details.component';

describe('AccommodationDetailsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailsComponent],
      imports: [HttpClientTestingModule]  // Use HttpClientTestingModule instead of HttpClientModule
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AccommodationDetailsComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
