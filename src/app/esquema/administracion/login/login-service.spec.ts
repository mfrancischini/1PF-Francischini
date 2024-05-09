import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginService } from './login-service';

describe('LoginService', () => {
  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('Debe establecer un usuario autenticado , crear un item en localStorage y redirigir al llamar login', () => {
    const spyOnSetItem = spyOn(localStorage, 'setItem');
    const spyOnNavigate = spyOn(router, 'navigate');
    loginService.login({
      username: 'mariano',
      password: '123456',
    });
    loginService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy(); 
        expect(spyOnSetItem).toHaveBeenCalled();
        expect(spyOnNavigate).toHaveBeenCalled();
      },
    });
  });



  it('Debe mostrar Correo o password incorrectos si los datos no son correctos', () => {
    const spyOnAlert = spyOn(window, 'alert');
    loginService.login({
      username: 'marcelo',
      password: 'abcde123',
    });
    expect(spyOnAlert).toHaveBeenCalledWith('Correo o password incorrectos');
  });




  it('Debe  llamar a removeItem al hacer logout', () => {
        const spyOnremoveItem = spyOn(localStorage, 'removeItem');
    loginService.logout();
    expect(spyOnremoveItem).toHaveBeenCalled();
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

