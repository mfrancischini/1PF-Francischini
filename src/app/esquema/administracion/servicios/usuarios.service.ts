import { Injectable } from '@angular/core';
import { IUsuario } from '../models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';

const USERS_DB: IUsuario[] = [
  
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

@Injectable({ providedIn: 'root' })
export class UsersService {
  getUsuarios(): Observable<IUsuario[]> {
    return of(USERS_DB).pipe(delay(1000));

  }
}