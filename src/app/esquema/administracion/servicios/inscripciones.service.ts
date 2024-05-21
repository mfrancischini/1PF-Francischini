import { Injectable } from '@angular/core';
import { IInscripciones } from '../models';
import { Observable, delay, map, of, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';



    @Injectable({
  providedIn: 'root'
})
export class InscrpcionesService {
      obtenerCursoPorId(idCurso: string): any {
        throw new Error('Method not implemented.');
      }

      httpClient: any;
constructor(private http: HttpClient) { }
  obtenerClases(): Observable<IInscripciones[]> {
    return this.http.get<IInscripciones[]>(environment.baseAPIURL + '/classes')
  }

  obtenerAlumnosById(id: string): Observable<IInscripciones[]| undefined> {
    return this.http.get<IInscripciones[]>(`${environment.baseAPIURL}/classes/${id}`)
   }


   eliminarInscripcionByID(id: string): Observable<IInscripciones> {
    return this.http.delete<IInscripciones>(`${environment.baseAPIURL}/classes/${id}`)
   }

   eliminarInscripcion(studentId: string, courseId: string): Observable<void> {
    const params = new HttpParams()
      .set('studentId', studentId)
      .set('courseId', courseId);

    return this.http.get<IInscripciones[]>(environment.baseAPIURL + '/classes', { params }).pipe(
      switchMap((inscripciones: IInscripciones[]) => {
        if (inscripciones.length > 0) {
          const inscripcionId = inscripciones[0].id; 
          return this.http.delete<void>(environment.baseAPIURL + `/classes/${inscripcionId}`);
        } else {
          throw new Error('Inscripción no encontrada');
        }
      })
    );
  }

  obtenerCursosXAlumnoBy(id: string): Observable<IInscripciones[]> {
    return this.http.get<IInscripciones[]>(environment.baseAPIURL+`/classes?studentId=${id}`);
    
  }

}
