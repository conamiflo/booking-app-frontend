import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page when redirectToLogin is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to profile page when redirectToProfile is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToProfile();
    expect(navigateSpy).toHaveBeenCalledWith(['/profile']);
  });


});
