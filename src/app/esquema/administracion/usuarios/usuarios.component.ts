import { Component } from '@angular/core';
import { IUsuario } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {


  displayedColumns: string[] = ['id', 'nombreyapellido', 'curso', 'email','editar', 'borrar'];


  usuarios: IUsuario[] = [
    { id: 1, nombre: 'Mariano', apellido: 'Francischini', curso: 'Diseño Web', email: 'mariano@example.com' },
    { id: 2, nombre: 'Ana', apellido: 'González', curso: 'Programación Java', email: 'ana@example.com' },
    { id: 3, nombre: 'Carlos', apellido: 'Martínez', curso: 'Desarrollo Frontend', email: 'carlos@example.com' },
    { id: 4, nombre: 'Lucía', apellido: 'Fernández', curso: 'Bases de Datos', email: 'lucia@example.com' },
    { id: 5, nombre: 'Pedro', apellido: 'López', curso: 'Diseño Web', email: 'pedro@example.com' },
    { id: 6, nombre: 'Laura', apellido: 'Rodríguez', curso: 'Desarrollo Frontend', email: 'laura@example.com' },
    { id: 7, nombre: 'Diego', apellido: 'Sánchez', curso: 'Desarrollo Frontend', email: 'diego@example.com' },
    { id: 8, nombre: 'María', apellido: 'Díaz', curso: 'Programación Java', email: 'maria@example.com' },
    { id: 9, nombre: 'Sofía', apellido: 'Gómez', curso: 'Desarrollo Frontend', email: 'sofia@example.com' },
    { id: 10, nombre: 'Juan', apellido: 'Pérez', curso: 'Diseño Web', email: 'juan@example.com' },
  ];
  constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  openDialog(usuarioEditado?: IUsuario): void {
    this.matDialog.open(UserFormComponent, {
      data: usuarioEditado,
    }).afterClosed().subscribe({
      next: (resultado) => {
        if (resultado) {

          if(usuarioEditado){
            this.usuarios = this.usuarios.map((usuario) => usuario.id === usuarioEditado.id ? {...usuario, ...resultado} : usuario )
        
          }
          else{
            this.usuarios = [...this.usuarios, resultado]
            resultado.id = this.usuarios.length

          }
          
        }

      },
    })



  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000, });
  }

  confirmarEliminacion(id: number) {
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
        Swal.fire({
          title: "¡Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success"
        });
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
        this.openSnackBar('Se elimino un nuevo usuario')
      }
    });
  }
}