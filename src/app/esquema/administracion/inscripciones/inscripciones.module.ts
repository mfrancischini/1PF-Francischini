import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionFormComponent } from './componente/inscripciones-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionEffects } from './store/inscripcion.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionFeature } from './store/inscripcion.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionFormComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(inscripcionFeature),
    EffectsModule.forFeature([InscripcionEffects]),
  ],
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }