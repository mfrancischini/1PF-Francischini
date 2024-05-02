import { Injectable } from '@angular/core';
import { ICursos } from '../models';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }
  obtenerCursos(): Observable<ICursos[]> {
   return this.http.get<ICursos[]>('http://localhost:3000/courses')
  }
}