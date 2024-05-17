import { Injectable } from '@angular/core';
import { IInscripciones } from '../models';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';



    @Injectable({
  providedIn: 'root'
})
export class InscrpcionesService {
  private baseUrl = 'http://localhost:3000';

      httpClient: any;
constructor(private http: HttpClient) { }
  obtenerClases(): Observable<IInscripciones[]> {
    return this.http.get<IInscripciones[]>('http://localhost:3000/classes')
  }

  obtenerAlumnosById(id: string): Observable<IInscripciones[]| undefined> {
    return this.http.get<IInscripciones[]>(`${this.baseUrl}/classes/${id}`)
   }


   eliminarInscripcionByID(id: string): Observable<IInscripciones> {
    return this.http.delete<IInscripciones>(`${this.baseUrl}/classes/${id}`)
   }

}
