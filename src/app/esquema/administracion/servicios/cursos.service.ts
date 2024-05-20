import { Injectable } from '@angular/core';
import { ICursos } from '../models';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  obtenerCursos(): Observable<ICursos[]> {
   return this.http.get<ICursos[]>('http://localhost:3000/courses')
  }

  obtenerCursoById(id: string): Observable<ICursos| undefined> {
    return this.http.get<ICursos>(`${this.baseUrl}/courses/${id}`)
   }

   obtenerCursosPorIds(ids: string[]): Observable<ICursos[]> {
    const queryString = ids.map(id => `id=${id}`).join('&');
    return this.http.get<ICursos[]>(`${this.baseUrl}/courses?${queryString}`);
  }

  
}