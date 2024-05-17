import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAlumnos, ICursos, IInscripciones } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InscrpcionesService } from '../servicios/inscripciones.service';
import Swal from 'sweetalert2';
import { InscripcionFormComponent } from './componente/inscripciones-form.component';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CursosService } from '../servicios/cursos.service';
import { UsersService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit, OnDestroy{


  displayedColumns: string[] = ['id', 'id_curso', 'id_alumno', 'profesor', 'fecha_cursada', 'horario', 'editar', 'borrar'];


alumnosCursos: IAlumnos[] = []
cursos: ICursos[] = []
inscripciones: IInscripciones[] = [];
inscripcionesSubscription: Subscription | undefined;
private subscriptions: Subscription[] = [];

constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar,private alumnoService: UsersService,private inscripcionesService: InscrpcionesService,  private http: HttpClient, private cursosService: CursosService) { }
ngOnDestroy(): void {
  if (this.inscripcionesSubscription) {
    this.inscripcionesSubscription.unsubscribe();
    console.log("Me destruyo");
  }
}


ngOnInit(): void {
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
      console.log('error: ', err);
      Swal.fire('Error', 'Ocurrio un error', 'error');
    },
    complete: () => {
      console.log('complete');
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
      let url = 'http://localhost:3000/classes/';

      if (claseEditada && claseEditada.id) {
        url += claseEditada.id; 
        this.http.put<any>(url, resultado).subscribe(
          (data) => {
            this.inscripciones = this.inscripciones.map((inscripciones) => inscripciones.id === claseEditada.id ? { ...inscripciones, ...data } : inscripciones);
          },
          (error) => {
            console.error('Error al llamar a la API:', error);
          }
        );
      } else {
        this.http.post<any>(url, resultado).subscribe(
          (data) => {
            this.inscripciones = [...this.inscripciones, data];
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
    text: "¿Está seguro de eliminar la inscripción?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí"
  }).then((result) => {
    if (result.isConfirmed) {
    
      {
        this.http.delete(`http://localhost:3000/classes/${id}`).subscribe(
          () => {
            // Eliminación exitosa
            Swal.fire({
              title: "¡Eliminado!",
              text: "La inscripción se ha sido eliminado.",
              icon: "success"
            });
            this.inscripcionesService.obtenerClases().subscribe({
              next: (inscripciones) => {
                this.inscripciones = inscripciones;
                this.openSnackBar('Se eliminó la inscripción correctamente');
                console.log("Se elimino la clase" + id);
              },      
              error: (err) => {
                console.log('Error al obtener las inscripción después de eliminar:', err);
                this.openSnackBar('Error al obtener las inscripción después de eliminar');
              }
            });
          },
          (error) => {
              console.error('Error al eliminar la inscripción:', error);
            this.openSnackBar('Error al eliminar la inscripción');
          }
        );
      }
    }
  });
}

}