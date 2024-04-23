import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClasesFormComponent } from '../../clases/componente/clases-form.component';
import { IClases, ICursos } from '../../models';

@Component({
  selector: 'app-form-cursos',
  templateUrl: './form-cursos.component.html',
  styleUrl: './form-cursos.component.scss'
})
export class FormCursosComponent {

  cursoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClasesFormComponent>,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private cursoEditado?: ICursos) {
      this.cursoForm = this.formBuilder.group({
        id_curso: ['', [Validators.required]],
        nombre_curso: ['', [Validators.required]],
        profesor: ['', Validators.required],
        fecha_cursada: ['', Validators.required],
        horario: ['', Validators.required],
      });
     

      if(cursoEditado){
        this.cursoForm.patchValue(cursoEditado)
      }
    }
    
    openSnackBar(message: string) {
      this._snackBar.open(message, 'cerrar', {
        duration: 3000
      });
    }

    enviar(): void {
      if (this.cursoForm.invalid) {
        this.cursoForm.markAllAsTouched();
      }
      else {
        this.matDialogRef.close(this.cursoForm.value);
        this.openSnackBar('Se creo un nuevo curso')
        localStorage.setItem('miClase', JSON.stringify(this.cursoForm.value));
      }
    
    }
  }
        

  

