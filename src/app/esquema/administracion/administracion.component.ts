import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IUsuario } from './models';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from './login/login-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.scss'
})
export class AdministracionComponent implements OnInit, OnDestroy {
  showFiller = false;

  mostrarComponent = true;

  _user$: Observable<IUsuario | null>;

  authUserSinPipe: IUsuario | null = null;
  userSuscription?: Subscription;

  constructor(private loguin : LoginService, private router: Router) {
    this._user$ = this.loguin.authUser$;
  }

  ngOnDestroy(): void {
    this.userSuscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSuscription = this.loguin.authUser$.subscribe({
      next: (user) => {
        this.authUserSinPipe = user;
      },
    });
  }

  logout(): void {
    this.loguin.logout();
    this.router.navigate(['login']);
  }

  isMobile(): boolean {
    return window.innerWidth <= 280;
  }
}