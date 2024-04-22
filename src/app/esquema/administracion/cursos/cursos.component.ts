import { Component, OnInit } from '@angular/core';
import { CursosService, ICursos } from '../servicios/cursos.service';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit{

  arrCursos: ICursos[] = [];

  constructor(private CursosService: CursosService) { }
  ngOnInit(): void {
    this.CursosService.getCursos$().subscribe((cursos) => {
      this.arrCursos = cursos
    })
  }


}
