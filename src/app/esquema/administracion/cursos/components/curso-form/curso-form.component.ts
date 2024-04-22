import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../../../servicios/cursos.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {
  formulario_curso: FormGroup;

  constructor(private CursosService: CursosService)
   {
    this.formulario_curso = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      fecha_inicio: new FormControl('', Validators.required),
      fecha_fin: new FormControl('', Validators.required),
      duracion: new FormControl('', Validators.required),
      profesor: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
  }

  enviar_form() {
this.CursosService.agregarCurso(this.formulario_curso.value);  }
}
