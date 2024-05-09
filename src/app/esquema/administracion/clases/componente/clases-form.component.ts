import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClases } from '../../models';

@Component({
  selector: 'app-clases-form',
  templateUrl: './clases-form.component.html',
  styleUrl: './clases-form.component.scss'
})
export class ClasesFormComponent {
  claseForm: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClasesFormComponent>,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private claseEditada?: IClases) {
      this.claseForm = this.formBuilder.group({
       // id: ['', [Validators.required]],
        id_curso: ['', [Validators.required]],
        nombre_clase: ['', Validators.required],
        profesor: ['', Validators.required],
        fecha_cursada: ['', Validators.required],
        horario: ['', Validators.required],
      });
      

      if(claseEditada){
        this.claseForm.patchValue(claseEditada)
      }
    }
    
    openSnackBar(message: string) {
      this._snackBar.open(message, 'cerrar', {
        duration: 3000
      });
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
        

  

