import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsuario } from '../../models';

@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
})
export class FormAdminComponent {

  adminForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<FormAdminComponent>,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private adminEditado?: IUsuario) {
      this.adminForm = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        password: ['', Validators.required],
        role: ['', Validators.required]
     
      });
     

      if(adminEditado){
        this.adminForm.patchValue(adminEditado)
      }
    }
    
    openSnackBar(message: string) {
      this._snackBar.open(message, 'cerrar', {
        duration: 3000
      });
    }

    enviar(): void {
      if (this.adminForm.invalid) {
        this.adminForm.markAllAsTouched();
      }
      else {
        this.matDialogRef.close(this.adminForm.value);
        this.openSnackBar('Se creo un nuevo usuario')
      }
    
    }
  }
        
