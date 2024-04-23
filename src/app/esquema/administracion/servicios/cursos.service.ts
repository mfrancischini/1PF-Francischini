import { Injectable } from '@angular/core';
import { ICursos } from '../models';
import { Observable, delay, of } from 'rxjs';


const CURSOS_DB: ICursos[] = [
  
  { id_curso: 1, nombre_curso: 'Desarrollo Web', profesor: 'Leonardo Grapia', fecha_cursada: '2022-01-01', horario: '10:00 - 11:00' },];
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  obtenerCursos(): Observable<ICursos[]> {
    return of(CURSOS_DB).pipe(delay(1000));

  }
}