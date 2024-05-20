import { Injectable } from '@angular/core';
import { IAlumnos, ICreateAlumnosPayload } from '../models';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<IAlumnos[]> {
    return this.http
      .get<IAlumnos[]>('http://localhost:3000/students')
  }

  createAlumnos(payload: ICreateAlumnosPayload): Observable<IAlumnos> {
    return this.http.post<IAlumnos>('http://localhost:3000/students', payload)
  
  }


  deleteAlumnos(id: string): Observable<IAlumnos> {
    return this.http.delete<IAlumnos>(`http://localhost:3000/students/${id}`)
  }


  updateAlumnos(id: string, payload: ICreateAlumnosPayload): Observable<IAlumnos> {
    return this.http.put<IAlumnos>(`http://localhost:3000/students/${id}`, payload);
  }

  getUsuarioById(id: string): Observable<IAlumnos> {
    return this.http.get<IAlumnos>(`http://localhost:3000/students/${id}`)
  }
  
}


