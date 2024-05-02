import { Injectable } from '@angular/core';
import { IClases } from '../models';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';



    @Injectable({
  providedIn: 'root'
})
export class ClasesService {
constructor(private http: HttpClient) { }
  obtenerClases(): Observable<IClases[]> {
    return this.http.get<IClases[]>('http://localhost:3000/classes')
  }}
