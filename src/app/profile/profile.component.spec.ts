import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set passwordInputType correctly', () => {
    component.profileForm.controls.showPassword.setValue(true);
    expect(component.passwordInputType).toBe('text');

    component.profileForm.controls.showPassword.setValue(false);
    expect(component.passwordInputType).toBe('password');
  });

  it('should reset form fields on resetForm', () => {
    spyOn(component, 'loadFields');
    component.resetForm();
    expect(component.loadFields).toHaveBeenCalled();
  });

});
