import { Component, OnInit } from '@angular/core';
import { IAlumnos } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UsersService } from '../servicios/usuarios.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nombreyapellido', 'curso', 'email', 'editar', 'borrar'];


  usuarios: IAlumnos[] = [];
  constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar, private usuariosService: UsersService) { }
  ngOnInit(): void {
    //this.loading = true;
    this.usuariosService.getUsuarios().subscribe({
      next: (users) => {
        console.log('next: ', users);
        this.usuarios = users;
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

  openDialog(usuarioEditado?: IAlumnos): void {
    this.matDialog
      .open(UserFormComponent, {
        data: usuarioEditado,
      })
      .afterClosed()
      .subscribe({
        next: (resultado) => {
          if (resultado) {
            if (usuarioEditado) {
              this.usuarios = this.usuarios.map((usuario) => usuario.id === usuarioEditado.id ? { ...usuario, ...resultado } : usuario)

            } else {
              this.usuarios = [...this.usuarios, resultado]
              resultado.id = this.usuarios.length
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