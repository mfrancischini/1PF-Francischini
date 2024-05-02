import { Injectable } from '@angular/core';
import { IAlumnos } from '../models';
import { catchError, delay, first, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<IAlumnos[]> {
    return this.http
      .get<IAlumnos[]>('http://localhost:3000/students')
  }
}