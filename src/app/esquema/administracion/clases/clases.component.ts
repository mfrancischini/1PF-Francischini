import { Component, OnInit } from '@angular/core';
import { IClases } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClasesService } from '../servicios/clases.service';
import Swal from 'sweetalert2';
import { ClasesFormComponent } from './componente/clases-form.component';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent implements OnInit{


  displayedColumns: string[] = ['id_clase', 'id_curso', 'nombre_clase', 'profesor', 'fecha_cursada', 'horario', 'editar', 'borrar'];



clases: IClases[] = [];
constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar, private clasesService: ClasesService) { }


ngOnInit(): void {
  //this.loading = true;
  this.clasesService.obtenerClases().subscribe({
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
      //this.loading = false;
    },
  });
}

openDialog(claseEditada?: IClases): void {
  this.matDialog
    .open(ClasesFormComponent, {
      data: claseEditada,
    })
    .afterClosed()
    .subscribe({
      next: (resultado) => {
        if (resultado) {
          if (claseEditada) {
            this.clases = this.clases.map((clase) => clase.id_clase === claseEditada.id_clase ? { ...clase, ...resultado } : clase)

          } else {
            this.clases = [...this.clases, resultado]
            resultado.id = this.clases.length
          }
        }
      },
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
      Swal.fire({
        title: "¡Eliminado!",
        text: "La clase ha sido eliminado.",
        icon: "success"
      });
      this.clases = this.clases.filter(clase => clase.id_clase !== id);
      this.openSnackBar('Se elimino una nueva clase')
    }
  });
}
}
