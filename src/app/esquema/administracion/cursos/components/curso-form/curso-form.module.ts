import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CursoFormRoutingModule } from './curso-form-routing.module'; // Ruta de importación corregida
import { CursoFormComponent } from './curso-form.component';

@NgModule({
  declarations: [
    CursoFormComponent
  ],
  imports: [
    CommonModule,
    CursoFormRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    CursoFormComponent
  ]
})
export class CursosFormModule { }

