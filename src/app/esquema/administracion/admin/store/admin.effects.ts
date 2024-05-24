import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AdminActions } from './admin.actions';
import { AdminService } from '../../servicios/admin.service';


@Injectable()
export class AdminEffects {

  loadAdmins$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AdminActions.loadAdmins),
      concatMap((action) =>
   
        this.adminService.obtenerAdmin().pipe(
         
         
          map(data => AdminActions.loadAdminsSuccess({ data })),
         
         
          catchError(error => of(AdminActions.loadAdminsFailure({ error }))))
      )
    );
  });

  

  createCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AdminActions.createAdmins),
      concatMap((action) =>
        this.adminService.createAdmin(action.data).pipe(
          //todo ok
          map(data => AdminActions.createAdminsSuccess({ data })),
          //todo error
          catchError(error => of(AdminActions.createAdminsFailure({ error }))))
      )
    );
  });


  deleteCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AdminActions.deleteAdminsById),
      concatMap((action) =>
        this.adminService.deleteAdmin(action.id).pipe(
          //todo ok
          map(data => AdminActions.deleteAdminsByIdSuccess({ data })),
          //todo error
          catchError(error => of(AdminActions.deleteAdminsByIdFailure({ error }))))
      )
    );
  });



  
  updateCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AdminActions.updateAdmins),
      concatMap((action) =>
        this.adminService.updateAdmin(action.id, action.payload).pipe(
          //todo ok
          map(data => AdminActions.updateAdminsSuccess({ data })),
          //todo error
          catchError(error => of(AdminActions.updateAdminsFailure({ error }))))
      )
    );
  });




  constructor(private actions$: Actions, private adminService: AdminService) {}
}
