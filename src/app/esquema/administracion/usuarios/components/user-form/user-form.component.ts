import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsuario } from '../../../models';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<UserFormComponent>,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private usuarioEditado?: IUsuario) {
      this.userForm = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$')]],
        apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ]+$')]],
        email: ['', [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'), Validators.required]],
      });
      

  
    if(usuarioEditado){
      this.userForm.patchValue(usuarioEditado)
    }
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {duration: 2000,});
  }
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    }
    else {
      this.matDialogRef.close(this.userForm.value);
      this.openSnackBar('Se creo un nuevo usuario')
    }

  }

}
