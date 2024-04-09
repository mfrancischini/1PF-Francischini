import { Component } from '@angular/core';
import { ICursos } from '../models';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {


   ICursos = [
    { id: 1, nombre: 'Marketing Digital', fecha_inicio: '2024-04-01', fecha_fin: '2024-06-30', duracion: '7 meses', profesor: 'Juan Pérez' },
    { id: 2, nombre: 'Diseño Gráfico', fecha_inicio: '2024-05-15', fecha_fin: '2024-08-15', duracion: '5 meses', profesor: 'María Gómez' },
    { id: 3, nombre: 'Desarrollo Web', fecha_inicio: '2024-06-01', fecha_fin: '2024-09-30', duracion: '4 meses', profesor: 'Carlos Rodríguez' },
    { id: 4, nombre: 'SQL', fecha_inicio: '2024-07-01', fecha_fin: '2024-09-30', duracion: '6 meses', profesor: 'Laura Sánchez' }, ];
  
}
