import { Component } from '@angular/core';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.scss'
})
export class AdministracionComponent {
  showFiller = false;

  mostrarUsuarios: boolean = false; // Variable para controlar la visibilidad del componente de usuarios
  mostrarCursos: boolean = false; // Variable para controlar la visibilidad del componente de cursos

  mostrarUsuariosComponente() {
    this.mostrarUsuarios = true;
    this.mostrarCursos = false;
  }

  mostrarCursosComponente() {
    this.mostrarUsuarios = false;
    this.mostrarCursos = true;
  }



}

