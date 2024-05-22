import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICursos, IUsuario } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login-service';
import { Store } from '@ngrx/store';
import { CursoActions } from './store/curso.actions';
import { selectCursos, selectCursosError, selectCursosLoading } from './store/curso.selectors';
import { Observable, Subscription } from 'rxjs';
import { FormCursosComponent } from './componente/form-cursos.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit, OnDestroy {
  _user$: Observable<IUsuario | null>;
  authUserSinPipe: IUsuario | null = null;

  displayedColumns: string[] = ['id', 'nombre_curso', 'profesor', 'fecha_cursada', 'horario', 'editar', 'borrar'];

  cursos$: Observable<ICursos[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;
  userSubscription?: Subscription;

  constructor(private matDialog: MatDialog, private store: Store, private _snackBar: MatSnackBar, private loginService: LoginService) { 
    this._user$ = this.loginService.authUser$;
    this.isLoading$ = this.store.select(selectCursosLoading);
    this.cursos$ = this.store.select(selectCursos);
    this.error$ = this.store.select(selectCursosError);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.store.dispatch(CursoActions.loadCursos());
    this.userSubscription = this.loginService.authUser$.subscribe({
      next: (user) => {
        this.authUserSinPipe = user;
      },
    });
  }

  openDialog(cursoEditado?: ICursos): void {
    const dialogRef = this.matDialog.open(FormCursosComponent, {
      data: cursoEditado,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (cursoEditado && cursoEditado.id) {
          this.store.dispatch(CursoActions.updateCursos({ id: cursoEditado.id, payload: resultado }));
        } else {
          this.store.dispatch(CursoActions.createCursos({ data: resultado }));
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
        this.store.dispatch(CursoActions.deleteCursosById({ id }));
      }
    });
  }
}
