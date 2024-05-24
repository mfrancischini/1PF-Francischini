import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUsuario, IDatosLogin } from '../models';
import { Store } from '@ngrx/store';
import { loginActions } from './store/login.actions';
import { loginUser } from './store/login.selectors';
import { AppState } from './store/app.state';

@Injectable({ providedIn: 'root' })
export class LoginService {

  public authUser$: Observable<IUsuario | null>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.authUser$ = this.store.select(loginUser);
  }


  verifyToken(): boolean {

    const token = localStorage.getItem('accessToken');
    if (token) {

      return true;
    } else {

      return false;
    }
  }

  login(data: IDatosLogin): void {
    this.store.dispatch(loginActions.login({ data }));

  }

  logout(): void {
    this.store.dispatch(loginActions.logout());

  }
}
