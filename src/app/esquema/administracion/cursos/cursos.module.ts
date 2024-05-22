import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { FormCursosComponent } from './componente/form-cursos.component';
import { MatCardModule } from '@angular/material/card';
import { CursoDetalleComponent } from './pages/cursos-detalle.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { CursoEffects } from './store/curso.effects';
import { StoreModule } from '@ngrx/store';
import { cursoFeature } from './store/curso.reducer';


@NgModule({
  declarations: [
    CursosComponent,
    FormCursosComponent,
    CursoDetalleComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    CursosRoutingModule,
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
    MatCardModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(cursoFeature),
    EffectsModule.forFeature([CursoEffects])
  ]
})
export class CursosModule { }
