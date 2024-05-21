import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { LoginService } from './login-service';
import { loginActions } from './store/login.actions';
import { AppState } from './store/app.state';

describe('LoginService', () => {
  let loginService: LoginService;
  let router: Router;
  let store: MockStore<AppState>;

  const initialState = {
    auth: {
      loginUser: null,
    },
  };

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: routerSpy },
        LoginService,
      ],
    });

    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
  });

  it('Debe disparar login action al llamar login', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const loginData = { username: 'mariano', password: '123456' };

    loginService.login(loginData);

    expect(dispatchSpy).toHaveBeenCalledWith(loginActions.login({ data: loginData }));
  });

  it('Debe disparar logout action al llamar logout', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    loginService.logout();

    expect(dispatchSpy).toHaveBeenCalledWith(loginActions.logout());
  });

  it('Debe retornar true si accessToken existe en localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummyAccessToken');

    const result = loginService.verifyToken();

    expect(result).toBe(true);
  });

  it('Debe retornar false si accessToken no existe en localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = loginService.verifyToken();

    expect(result).toBe(false);
  });
});
