import { Component, OnDestroy, OnInit } from '@angular/core';
import { IClases } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClasesService } from '../servicios/clases.service';
import Swal from 'sweetalert2';
import { ClasesFormComponent } from './componente/clases-form.component';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CursosService } from '../servicios/cursos.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent implements OnInit, OnDestroy{


  displayedColumns: string[] = ['id', 'id_curso', 'nombre_clase', 'profesor', 'fecha_cursada', 'horario', 'editar', 'borrar'];



clases: IClases[] = [];
clasesSubscription: Subscription | undefined;

constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar, private clasesService: ClasesService,  private http: HttpClient, private cursosService: CursosService) { }
ngOnDestroy(): void {
  if (this.clasesSubscription) {
    this.clasesSubscription.unsubscribe();
    console.log("Me destruyo");
  }
}


ngOnInit(): void {
  //this.loading = true;
  this.clasesSubscription=this.clasesService.obtenerClases().subscribe({
    next: (clases) => {
      console.log('next: ', clases);
      this.clases = clases;
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

openDialog(claseEditada?: IClases): void {
  const dialogRef = this.matDialog.open(ClasesFormComponent, {
    data: claseEditada,
  });

  dialogRef.afterClosed().subscribe((resultado) => {
    if (resultado) {
      let url = 'http://localhost:3000/classes/';

      if (claseEditada && claseEditada.id) {
        url += claseEditada.id; 
        this.http.put<any>(url, resultado).subscribe(
          (data) => {
            this.clases = this.clases.map((clase) => clase.id === claseEditada.id ? { ...clase, ...data } : clase);
          },
          (error) => {
            console.error('Error al llamar a la API:', error);
          }
        );
      } else {
        this.http.post<any>(url, resultado).subscribe(
          (data) => {
            this.clases = [...this.clases, data];
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

confirmarEliminacion(id: number) {
  Swal.fire({
    title: "ELIMINAR",
    text: "¿Está seguro de eliminar la clase?",
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
              text: "La clase se ha sido eliminado.",
              icon: "success"
            });
            this.clasesService.obtenerClases().subscribe({
              next: (clases) => {
                this.clases = clases;
                this.openSnackBar('Se eliminó la clase correctamente');
                console.log("Se elimino la clase" + id);
              },      
              error: (err) => {
                console.log('Error al obtener las clases después de eliminar:', err);
                this.openSnackBar('Error al obtener las clases después de eliminar');
              }
            });
          },
          (error) => {
              console.error('Error al eliminar la clase:', error);
            this.openSnackBar('Error al eliminar la clase');
          }
        );
      }
    }
  });
}

}