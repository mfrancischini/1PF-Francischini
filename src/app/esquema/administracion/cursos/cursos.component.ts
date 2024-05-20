import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICursos, IInscripciones, IUsuario } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CursosService } from '../servicios/cursos.service';
import { FormCursosComponent } from './componente/form-cursos.component';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { InscrpcionesService } from '../servicios/inscripciones.service';
import { LoginService } from '../login/login-service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit , OnDestroy{
  _user$: Observable<IUsuario | null>;
  authUserSinPipe: IUsuario | null = null;

  displayedColumns: string[] = ['id', 'nombre_curso', 'profesor', 'fecha_cursada', 'horario', 'editar', 'borrar'];

 inscripciones: IInscripciones[] = [];
cursos: ICursos[] = [];
cursosSubscription: Subscription | undefined;
userSuscription?: Subscription;

constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar, private loguin : LoginService,private cursosService: CursosService, private http: HttpClient) { 

  this._user$ = this.loguin.authUser$;
}
  ngOnDestroy(): void {
    if (this.cursosSubscription) {
      this.cursosSubscription.unsubscribe();
      
    }
  }


ngOnInit(): void {

  this.userSuscription = this.loguin.authUser$.subscribe({
    next: (user) => {
      this.authUserSinPipe = user;
    },
  });
  this.cursosSubscription = this.cursosService.obtenerCursos().subscribe({
    next: (cursos) => {
      console.log('next: ', cursos);
      this.cursos = cursos;
    },
    error: (err) => {
      console.log('error: ', err);
      Swal.fire('Error', 'Ocurrio un error', 'error');
    },
    complete: () => {
      console.log('complete');
    },
  });
}



openDialog(cursoEditado?: ICursos): void {
  const dialogRef = this.matDialog.open(FormCursosComponent, {
    data: cursoEditado,
  });
 

  dialogRef.afterClosed().subscribe((resultado) => {
    if (resultado) {
      let url = 'http://localhost:3000/courses/';

      if (cursoEditado && cursoEditado.id) {
        url += cursoEditado.id; 
        this.http.put<any>(url, resultado).subscribe(
          (data) => {
            this.cursos = this.cursos.map((curso) => curso.id === cursoEditado.id ? { ...curso, ...data } : curso);
          },
          (error) => {
            console.error('Error al llamar a la API:', error);
          }
        );
      } else {
        this.http.post<any>(url, resultado).subscribe(
          (data) => {
            
            this.cursos = [...this.cursos, data];
          },
          (error) => {
            console.error('Error al llamar a la API:', error);
          }
        );
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
    text: "¿Está seguro de eliminar el curso?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí"
  }).then((result) => {
    if (result.isConfirmed) {
    
      {
        this.http.delete(`http://localhost:3000/courses/${id}`).subscribe(
          () => {
            // Eliminación exitosa
            Swal.fire({
              title: "¡Eliminado!",
              text: "El curso ha sido eliminado.",
              icon: "success"
            });
            this.cursosService.obtenerCursos().subscribe({
              next: (cursos) => {
                this.cursos = cursos;
                this.openSnackBar('Se eliminó el curso correctamente');
                console.log("se elimino el curso" + id);
              },      
              error: (err) => {
                console.log('Error al obtener cursos después de eliminar:', err);
                this.openSnackBar('Error al obtener cursos después de eliminar');
              }
            });
          },
          (error) => {
              console.error('Error al eliminar el curso:', error);
            this.openSnackBar('Error al eliminar el curso');
          }
        );
      }
    }
  });
}

}
