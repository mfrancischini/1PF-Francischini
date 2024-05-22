import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAlumnos, ICursos, IInscripciones, IUsuario } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InscrpcionesService } from '../servicios/inscripciones.service';
import Swal from 'sweetalert2';
import { InscripcionFormComponent } from './componente/inscripciones-form.component';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CursosService } from '../servicios/cursos.service';
import { UsersService } from '../servicios/usuarios.service';
import { LoginService } from '../login/login-service';
import { Store } from '@ngrx/store';
import { selectInscripcionState, selectInscripciones, selectInscripcionesError, selectInscripcionesLoading } from './store/inscripcion.selectors';
import { InscripcionActions } from './store/inscripcion.actions';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit, OnDestroy{


  displayedColumns: string[] = ['id', 'courseId', 'studentId', 'profesor', 'fecha_cursada', 'horario', 'editar', 'borrar'];

  _user$: Observable<IUsuario | null>;
alumnosCursos: IAlumnos[] = []
cursos: ICursos[] = []
inscripciones: IInscripciones[] = [];
inscripcionesSubscription: Subscription | undefined;
private subscriptions: Subscription[] = [];
isLoading$: Observable<boolean>
inscripciones$ : Observable<IInscripciones[]> ;
error$: Observable<unknown>;
constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar,private loguin : LoginService,private alumnoService: UsersService,private inscripcionesService: InscrpcionesService,  private http: HttpClient, private cursosService: CursosService, private store: Store) {
  this._user$ = this.loguin.authUser$;
this.isLoading$ = this.store.select(selectInscripcionesLoading);
this.inscripciones$ = this.store.select(selectInscripciones);
this.error$ = this.store.select(selectInscripcionesError);

 }
ngOnDestroy(): void {
  if (this.inscripcionesSubscription) {
    this.inscripcionesSubscription.unsubscribe();
  }
}


ngOnInit(): void {


    this.store.dispatch(InscripcionActions.loadInscripcions());


  const alumnosSubscription = this.alumnoService.getUsuarios().subscribe(data => {
    this.alumnosCursos = data;
  });
  this.subscriptions.push(alumnosSubscription);

  const cursosSubscription = this.cursosService.obtenerCursos().subscribe(data => {
    this.cursos = data;
  });
  this.subscriptions.push(cursosSubscription);
  this.inscripcionesSubscription=this.inscripcionesService.obtenerClases().subscribe({
    next: (inscripciones) => {
      this.inscripciones = inscripciones;
    },
    error: (err) => {
      Swal.fire('Error', 'Ocurrio un error', 'error');
    },
    complete: () => {
    },
  });
}

getAlumnoNombre(id_alumno: string): string {
  const alumno = this.alumnosCursos.find(al => al.id === id_alumno);
  return alumno ? alumno.nombre : 'Desconocido';
}



getCursoNombre(id_curso: string): string {
  const curso = this.cursos.find(al => al.id === id_curso);
  return curso ? curso.nombre_curso : 'Desconocido';
}

openDialog(claseEditada?: IInscripciones): void {
  const dialogRef = this.matDialog.open(InscripcionFormComponent, {
    data: claseEditada,
  });

  dialogRef.afterClosed().subscribe((resultado) => {
    if (resultado) {
      if (claseEditada && claseEditada.id) {
        this.store.dispatch(InscripcionActions.updateInscripcions({ id: claseEditada.id, payload: resultado }));
      } else {
        this.store.dispatch(InscripcionActions.createInscripcions({ data: resultado }));
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
    text: "¿Está seguro de eliminar la inscripcion?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí"
  }).then((result) => {
    if (result.isConfirmed) {
      this.store.dispatch(InscripcionActions.deleteInscripcionsById({ id }));
    }
  });
}

}