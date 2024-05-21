import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IUsuario } from './models';
import { Observable, Subscription, map, filter } from 'rxjs';
import { LoginService } from './login/login-service';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginActions } from './login/store/login.actions';

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
  routeData$: Observable<Data | undefined>;

  constructor(private loguin : LoginService, private router: Router, private route: ActivatedRoute,private store: Store) {
    this._user$ = this.loguin.authUser$;
    this.routeData$ = router.events.pipe(
      filter((ev) => ev instanceof NavigationEnd),
      map(() => route.firstChild?.snapshot.data)
    );
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
    this.store.dispatch(loginActions.logout());
    this.router.navigate(['login']);
  }


}