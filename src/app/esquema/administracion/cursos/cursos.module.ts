import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CursoFormComponent } from './components/curso-form/curso-form.component';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],

  exports: [
    CursosComponent
  ]
  
})
export class CursosModule { }
