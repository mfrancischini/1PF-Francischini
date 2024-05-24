import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUsuario } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login-service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormAdminComponent } from './component/form-admin.component';
import { AdminActions } from './store/admin.actions';
import { selectAdmin, selectAdminError, selectAdminLoading } from './store/admin.selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit, OnDestroy {
  _user$: Observable<IUsuario | null>;
  authUserSinPipe: IUsuario | null = null;

  displayedColumns: string[] = ['id', 'usuario', 'password', 'role', 'editar', 'borrar'];

  admin$: Observable<IUsuario[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;
  userSubscription?: Subscription;

  constructor(private matDialog: MatDialog, private store: Store, private _snackBar: MatSnackBar, private loginService: LoginService) { 
    this._user$ = this.loginService.authUser$;
    this.isLoading$ = this.store.select(selectAdminLoading);
    this.admin$ = this.store.select(selectAdmin);
    this.error$ = this.store.select(selectAdminError);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadAdmins());
    this.userSubscription = this.loginService.authUser$.subscribe({
      next: (user) => {
        this.authUserSinPipe = user;
      },
    });
  }

  openDialog(adminEditado?: IUsuario): void {
    const dialogRef = this.matDialog.open(FormAdminComponent, {
      data: adminEditado,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (adminEditado && adminEditado.id) {
          this.store.dispatch(AdminActions.updateAdmins({ id: adminEditado.id, payload: resultado }));
        } else {
          this.store.dispatch(AdminActions.createAdmins({ data: resultado }));
        }
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000 });
  }

  confirmarEliminacion(id: string) {
    Swal.fire({
      title: "ELIMINAR",
      text: "¿Está seguro de eliminar el curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(AdminActions.deleteAdminsById({ id }));
      }
    });
  }
}
