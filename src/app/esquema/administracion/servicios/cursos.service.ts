import { Injectable } from '@angular/core';
import { ICreateCursosPayload, ICursos } from '../models';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }
  obtenerCursos(): Observable<ICursos[]> {
   return this.http.get<ICursos[]>(environment.baseAPIURL + '/courses');

  }

  createCursos(payload: ICreateCursosPayload): Observable<ICursos> {
    return this.http.post<ICursos>(environment.baseAPIURL + '/courses', payload)
  
  }

  updateCursos(id: string, payload: ICreateCursosPayload): Observable<ICursos> {
    return this.http.put<ICursos>(`${environment.baseAPIURL}/courses/${id}`, payload);
  }


  obtenerCursoById(id: string): Observable<ICursos| undefined> {
    return this.http.get<ICursos>(`${environment.baseAPIURL}/courses/${id}`)
   }

   obtenerCursosPorIds(ids: string[]): Observable<ICursos[]> {
    const queryString = ids.map(id => `id=${id}`).join('&');
    return this.http.get<ICursos[]>(`${environment.baseAPIURL}/courses?${queryString}`);
  }

  deleteCursos(id: string): Observable<ICursos> {
    return this.http.delete<ICursos>(`${environment.baseAPIURL}/courses/${id}`)
  }

  
}