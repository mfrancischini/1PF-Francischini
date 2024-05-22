import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CursoActions } from './curso.actions';
import { CursosService } from '../../servicios/cursos.service';


@Injectable()
export class CursoEffects {

  loadCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursoActions.loadCursos),
      concatMap(() =>
        this.cursosService.obtenerCursos().pipe(
          //todo ok
          map(data => CursoActions.loadCursosSuccess({ data })),
          //todo error
          catchError(error => of(CursoActions.loadCursosFailure({ error }))))
      )
    );
  });



  createCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursoActions.createCursos),
      concatMap((action) =>
        this.cursosService.createCursos(action.data).pipe(
          //todo ok
          map(data => CursoActions.createCursosSuccess({ data })),
          //todo error
          catchError(error => of(CursoActions.createCursosFailure({ error }))))
      )
    );
  });


  deleteCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursoActions.deleteCursosById),
      concatMap((action) =>
        this.cursosService.deleteCursos(action.id).pipe(
          //todo ok
          map(data => CursoActions.deleteCursosByIdSuccess({ data })),
          //todo error
          catchError(error => of(CursoActions.deleteCursosByIdFailure({ error }))))
      )
    );
  });



  
  updateCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursoActions.updateCursos),
      concatMap((action) =>
        this.cursosService.updateCursos(action.id, action.payload).pipe(
          //todo ok
          map(data => CursoActions.updateCursosSuccess({ data })),
          //todo error
          catchError(error => of(CursoActions.updateCursosFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions, private cursosService: CursosService) {}
}
