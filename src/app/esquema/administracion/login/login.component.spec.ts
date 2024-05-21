import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login.component';
import { LoginService } from './login-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from './store/app.state';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let store: MockStore<AppState>;

  const initialState = {
    auth: {
      loginUser: null,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        LoginService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    store = TestBed.inject(MockStore);

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

});
