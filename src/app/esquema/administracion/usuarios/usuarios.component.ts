import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAlumnos } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UsersService } from '../servicios/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UsuarioActions } from './store/usuario.actions';
import { selectIsLoading, selectUsuarios } from './store/usuario.selectors';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['id', 'nombreyapellido', 'curso', 'email', 'editar','ver', 'borrar'];

  isLoading$: Observable<boolean>;
  alumnos$: Observable<IAlumnos[]>
  usuarios: IAlumnos[] = [];
  usuariosSubscription: Subscription | undefined;
  constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar, private usuariosService: UsersService, private http: HttpClient, private store: Store) {

    this.isLoading$ = store.select(selectIsLoading);
    this.alumnos$ = store.select(selectUsuarios);
  }



  ngOnDestroy(): void {
    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
      console.log("Me destruyo");
    }
  }



  ngOnInit(): void {

    this.store.select(selectIsLoading).subscribe(console.log);
    this.store.dispatch(UsuarioActions.loadUsuarios());
  }
  openDialog(usuarioEditado?: IAlumnos): void {
    const dialogRef = this.matDialog.open(UserFormComponent, {
      data: usuarioEditado,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (usuarioEditado && usuarioEditado.id) {
          this.store.dispatch(UsuarioActions.updateUsuarios({ id: usuarioEditado.id, payload: resultado }));
        } else {
          this.store.dispatch(UsuarioActions.createUsuarios({ payload: resultado }));
        }
      }
    });
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000, });
  }

  confirmarEliminacion(id: string) {
    Swal.fire({
      title: "ELIMINAR",
      text: "¿Está seguro de eliminar al usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {

        {
          this.store.dispatch(UsuarioActions.deleteUsuarios({ id }));
        }
      }
    });
  }






}