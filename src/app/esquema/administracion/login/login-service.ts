import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUsuario, IDatosLogin } from '../models';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private MOCK_AUTH_USER: IUsuario = {
    id: "1",
    nombre: 'mariano',
    email: 'mariano@mail.com',
    role: 'ADMIN',
  };

  private _authUser$ = new BehaviorSubject<IUsuario | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: IDatosLogin): void {
    if (data.username !== 'mariano' || data.password !== '123456') {
      alert('Correo o password incorrectos');
    } else {
      this._authUser$.next(this.MOCK_AUTH_USER);
      localStorage.setItem(
        'accessToken',
        '21397873403248093420'
      );
      this.router.navigate(['alumnos']);
    }
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._authUser$.next(this.MOCK_AUTH_USER);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
  }
}