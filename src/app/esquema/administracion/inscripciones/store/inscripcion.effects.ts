import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { InscrpcionesService } from '../../servicios/inscripciones.service';


@Injectable()
export class InscripcionEffects {

  loadInscripcions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.loadInscripcions),
      concatMap(() =>
        this.inscripcionService.obtenerClases().pipe(

          map(data => InscripcionActions.loadInscripcionsSuccess({ data })),
          
          catchError(error => of(InscripcionActions.loadInscripcionsFailure({ error }))))
      )
    );
  });

  
  createInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.createInscripcions),
      concatMap((action) =>
        this.inscripcionService.createInscripcion(action.data).pipe(
          //todo ok
          map(data => InscripcionActions.createInscripcionsSuccess({ data })),
          //todo error
          catchError(error => of(InscripcionActions.createInscripcionsFailure({ error }))))
      )
    );
  });


  
  deleteInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.deleteInscripcionsById),
      concatMap((action) =>
        this.inscripcionService.eliminarInscripcionByID(action.id).pipe(
          //todo ok
          map(data => InscripcionActions.deleteInscripcionsByIdSuccess({ data })),
          //todo error
          catchError(error => of(InscripcionActions.deleteInscripcionsByIdFailure({ error }))))
      )
    );
  });



  
  updateInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.updateInscripcions),
      concatMap((action) =>
        this.inscripcionService.updateInscripcion(action.id, action.payload).pipe(
          //todo ok
          map(data => InscripcionActions.updateInscripcionsSuccess({ data })),
          //todo error
          catchError(error => of(InscripcionActions.updateInscripcionsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions, private inscripcionService: InscrpcionesService) {}
}
