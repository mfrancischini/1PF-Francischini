import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';



export interface ICursos {
  id: number;
   nombre: string;
   fecha_inicio: string;
  fecha_fin: string;
 duracion: string;
   profesor: string;
}
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos: ICursos[];
  private cursos$: Subject<ICursos[]>;
  constructor() { 

    this.cursos = [] ;
    this.cursos$ = new Subject() 
 
  }

    agregarCurso(Ccurso: ICursos){
      this.cursos.push(Ccurso);
      this.cursos$.next(this.cursos);
    }


    getCursos$(): Observable<ICursos[]>{

      return this.cursos$.asObservable();
    }


}