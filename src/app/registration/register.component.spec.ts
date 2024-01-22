import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /*it('should have empty fields initially', () => {
    expect(component.email).toEqual('');
    expect(component.password).toEqual('');
    expect(component.confirmPassword).toEqual('');
    expect(component.firstName).toEqual('');
    expect(component.lastName).toEqual('');
    expect(component.address).toEqual('');
    expect(component.phoneNumber).toEqual('');
  });*/
});
