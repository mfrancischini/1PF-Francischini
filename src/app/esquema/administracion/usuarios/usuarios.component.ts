import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAlumnos } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UsersService } from '../servicios/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit , OnDestroy{


  displayedColumns: string[] = ['id', 'nombreyapellido', 'curso', 'email', 'editar', 'borrar'];


  usuarios: IAlumnos[] = [];
  usuariosSubscription: Subscription | undefined;
  constructor(private matDialog: MatDialog, private _snackBar: MatSnackBar, private usuariosService: UsersService, private http: HttpClient) { }
  ngOnDestroy(): void {
    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
      console.log("Me destruyo");
    }
  }
 
 

  ngOnInit(): void {
    this.usuariosSubscription = this.usuariosService.getUsuarios().subscribe({
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
      },
    });
  }

  openDialog(usuarioEditado?: IAlumnos): void {
    const dialogRef = this.matDialog.open(UserFormComponent, {
      data: usuarioEditado,
    });
  
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        let url = 'http://localhost:3000/students/';
  
        if (usuarioEditado && usuarioEditado.id) {
          url += usuarioEditado.id; 
          this.http.put<any>(url, resultado).subscribe(
            (data) => {
              this.usuarios = this.usuarios.map((usuario) => usuario.id === usuarioEditado.id ? { ...usuario, ...data } : usuario);
            },
            (error) => {
              console.error('Error al llamar a la API:', error);
            }
          );
        } else {
          this.http.post<any>(url, resultado).subscribe(
            (data) => {
              this.usuarios = [...this.usuarios, data];
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
      text: "¿Está seguro de eliminar al usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
    
        {
          this.http.delete(`http://localhost:3000/students/${id}`).subscribe(
            () => {
              // Eliminación exitosa
              Swal.fire({
                title: "¡Eliminado!",
                text: "El curso ha sido eliminado.",
                icon: "success"
              });
              // Actualizar la lista de cursos en el componente
              this.usuariosService.getUsuarios().subscribe({
                next: (usuarios) => {
                  this.usuarios = usuarios;
                  this.openSnackBar('Se eliminó el curso correctamente');
                },
                error: (err) => {
                  console.log('Error al obtener cursos después de eliminar:', err);
                  this.openSnackBar('Error al obtener cursos después de eliminar');
                }
              });
            },
            (error) => {
              // Manejar errores durante la eliminación
              console.error('Error al eliminar el curso:', error);
              this.openSnackBar('Error al eliminar el curso');
            }
          );
        }
      }
    });
  }





  
}