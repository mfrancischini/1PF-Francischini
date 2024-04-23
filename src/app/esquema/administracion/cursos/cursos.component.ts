import { Component, OnInit } from '@angular/core';
import { IClases, ICursos } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ClasesFormComponent } from '../clases/componente/clases-form.component';
import { ClasesService } from '../servicios/clases.service';
import { CursosService } from '../servicios/cursos.service';
import { FormCursosComponent } from './componente/form-cursos.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit{

  displayedColumns: string[] = ['id_curso', 'nombre_curso', 'profesor', 'fecha_cursada', 'horario', 'editar', 'borrar'];



cursos: ICursos[] = [];
constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar, private cursosService: CursosService) { }


ngOnInit(): void {
  //this.loading = true;
  this.cursosService.obtenerCursos().subscribe({
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
      //this.loading = false;
    },
  });
}

openDialog(cursoEditado?: IClases): void {
  this.matDialog
    .open(FormCursosComponent, {
      data: cursoEditado,
    })
    .afterClosed()
    .subscribe({
      next: (resultado) => {
        if (resultado) {
          if (cursoEditado) {
            this.cursos = this.cursos.map((curso) => curso.id_curso === cursoEditado.id_curso ? { ...curso, ...resultado } : curso)

          } else {
            this.cursos = [...this.cursos, resultado]
            resultado.id = this.cursos.length
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
    text: "¿Está seguro de eliminar el curso?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Eliminado!",
        text: "El curso ha sido eliminado.",
        icon: "success"
      });
      this.cursos = this.cursos.filter(curso => curso.id_curso !== id);
      this.openSnackBar('Se elimino un nuevo curso')
    }
  });
}
}
