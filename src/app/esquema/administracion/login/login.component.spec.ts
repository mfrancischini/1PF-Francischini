import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { LoginComponent } from './login.component';
import { LoginService } from './login-service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule,MatInputModule,
        MatSelectModule,BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    loginService = TestBed.inject(LoginService);

    fixture.detectChanges();
  });

  
  it('El campo username debe ser requerido', () => {
    const control = component.loginForm.get('username');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('El campo password debe ser requerido', () => {
    const control = component.loginForm.get('password');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTrue();
  });

  it('Debe llamar markAllAsTouched de loginForm si el formulario es invalido', () => {
    component.loginForm.setValue({
      username: '',
      password: '',
    });
    expect(component.loginForm.invalid).toBeTrue();
    const spyOnMarkAllAsTouched = spyOn(
      component.loginForm,
      'markAllAsTouched'
    );
    component.login();
    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });
  it('Debe llamar login de loginService si el formulario es valido', () => {
    const spyOnLogin = spyOn(loginService, 'login');
    component.loginForm.setValue({
      username: 'mariano',
      password: '123456'
    });
    component.login();
    expect(spyOnLogin).toHaveBeenCalled();
})



it('Debe llamar a logout de loginComponent', () => {
  const spyOnLogout = spyOn(loginService, 'logout');

  component.logout();
  expect(spyOnLogout).toHaveBeenCalled();
})
});