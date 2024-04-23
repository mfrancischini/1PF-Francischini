import { Injectable } from '@angular/core';
import { IClases } from '../models';
import { Observable, delay, of } from 'rxjs';


const CLASES_DB: IClases[] = [
  
    { id_clase: 1, id_curso: 1, nombre_clase: 'Clase 1', profesor: 'Profesor 1', fecha_cursada: '2022-01-01', horario: '10:00 - 11:00' },];
    @Injectable({
  providedIn: 'root'
})
export class ClasesService {

  obtenerClases(): Observable<IClases[]> {
    return of(CLASES_DB).pipe(delay(1000));

  }}
