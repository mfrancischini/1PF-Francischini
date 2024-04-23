import { Component, OnInit, OnDestroy  } from '@angular/core';
import { CursosService, ICursos } from '../servicios/cursos.service';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit , OnDestroy {
  displayedColumns: string[] = ['id', 'nombre', 'fecha_inicio', 'fecha_fin', 'duracion','profesor'];

  arrCursos: ICursos[]=[];

  constructor(private CursosService: CursosService) { }
  ngOnInit(): void {
    this.CursosService.getCursos$().subscribe((cursos) => {
      this.arrCursos = cursos
    })
  }

  ngOnDestroy(): void {
  this.CursosService.unsubscribe()
  }
}
