import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAlumnos, IInscripciones, ICursos } from '../../models';
import { UsersService } from '../../servicios/usuarios.service';
import { CursosService } from '../../servicios/cursos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inscripciones-form',
  templateUrl: './inscripciones-form.component.html',
})
export class InscripcionFormComponent implements OnInit, OnDestroy {
  claseForm: FormGroup;
  alumnosCursos: IAlumnos[] = []
  cursos: ICursos[] = []
  private subscriptions: Subscription[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<InscripcionFormComponent>, private _snackBar: MatSnackBar, private cursoService: CursosService,private alumnoService: UsersService, @Inject(MAT_DIALOG_DATA) private claseEditada?: IInscripciones) {
    this.claseForm = this.formBuilder.group({
      studentId: ['', [Validators.required]],
      courseId: ['', Validators.required],
      profesor: ['', Validators.required],
      fecha_cursada: ['', Validators.required],
      horario: ['', Validators.required],
    });

    if (claseEditada) {
      this.claseForm.patchValue(claseEditada)
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'cerrar', {
      duration: 3000
    });
  }


  ngOnInit(): void {
    const alumnosSubscription = this.alumnoService.getUsuarios().subscribe(data => {
      this.alumnosCursos = data;
    });
    this.subscriptions.push(alumnosSubscription);

    const cursosSubscription = this.cursoService.obtenerCursos().subscribe(data => {
      this.cursos = data;
    });
    this.subscriptions.push(cursosSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  enviar(): void {
    if (this.claseForm.invalid) {
      this.claseForm.markAllAsTouched();
    }
    else {
      this.matDialogRef.close(this.claseForm.value);
      this.openSnackBar('Se creo una nueva clase')
      localStorage.setItem('miClase', JSON.stringify(this.claseForm.value));
    }

  }
}




