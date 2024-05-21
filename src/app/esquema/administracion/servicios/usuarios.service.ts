import { Injectable } from '@angular/core';
import { IAlumnos, ICreateAlumnosPayload } from '../models';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<IAlumnos[]> {
    return this.http
      .get<IAlumnos[]>(environment.baseAPIURL + '/students')
  }

  createAlumnos(payload: ICreateAlumnosPayload): Observable<IAlumnos> {
    return this.http.post<IAlumnos>(environment.baseAPIURL + '/students', payload)
  
  }


  deleteAlumnos(id: string): Observable<IAlumnos> {
    return this.http.delete<IAlumnos>(`${environment.baseAPIURL}/students/${id}`)
  }


  updateAlumnos(id: string, payload: ICreateAlumnosPayload): Observable<IAlumnos> {
    return this.http.put<IAlumnos>(`${environment.baseAPIURL}/students/${id}`, payload);
  }

  getUsuarioById(id: string): Observable<IAlumnos> {
    return this.http.get<IAlumnos>(`${environment.baseAPIURL}/students/${id}`)
  }
  
}


