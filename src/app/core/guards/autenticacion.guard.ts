import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../esquema/administracion/login/login-service';
export const autenticacionGuard: CanActivateFn = (route, state) => {
  console.log('autenticacionGuard')
  const router = inject(Router);
  const loginService = inject(LoginService);


  const esUsuarioAutenticado = loginService.verifyToken()

  return esUsuarioAutenticado || router.createUrlTree(['login']);

}
