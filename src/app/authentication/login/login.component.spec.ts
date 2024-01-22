import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /*it('should have empty email and password initially', () => {
    expect(component.email).toEqual('');
    expect(component.password).toEqual('');
  });

  it('should reset email and password on submit', () => {
    component.email = 'test@example.com';
    component.password = 'password123';
    component.onSubmit();
    expect(component.email).toEqual('');
    expect(component.password).toEqual('');
  });*/
});
