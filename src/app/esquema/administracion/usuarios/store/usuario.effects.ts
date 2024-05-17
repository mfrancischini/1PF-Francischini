import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UsuarioActions } from './usuario.actions';
import { UsersService } from '../../servicios/usuarios.service';


@Injectable()
export class UsuarioEffects {

  loadUsuarios$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuarioActions.loadUsuarios),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.usersService.getUsuarios().pipe(
          //Todo OK
          map(data => UsuarioActions.loadUsuariosSuccess({ data })),
          //Error
          catchError(error => of(UsuarioActions.loadUsuariosFailure({ error }))))
      )
    );
  });
  

  createUsuarios$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuarioActions.createUsuarios),
      concatMap((action) =>
        this.usersService.createAlumnos(action.payload).pipe(
          //Todo OK
          map(data => UsuarioActions.createUsuariosSuccess({ data })),
          //Error
          catchError(error => of(UsuarioActions.createUsuariosFailure({ error }))))
      )
    );
  });


  deleteUsuarios$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuarioActions.deleteUsuarios),
      concatMap((action) =>
        this.usersService.deleteAlumnos(action.id).pipe(
          //Todo OK
          map(data => UsuarioActions.deleteUsuariosSuccess({ data })),
          //Error
          catchError(error => of(UsuarioActions.deleteUsuariosFailure({ error }))))
      )
    );
  });



  
  updateUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuarioActions.updateUsuarios),
      concatMap((action) =>
        this.usersService.updateAlumnos(action.id, action.payload).pipe(
          // Todo OK
          map((data) => UsuarioActions.updateUsuariosSuccess({ data })),
          // Error
          catchError((error) => of(UsuarioActions.updateUsuariosFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
