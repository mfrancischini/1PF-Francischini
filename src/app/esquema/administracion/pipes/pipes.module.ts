import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesRoutingModule } from './pipes-routing.module';
import { PipesComponent } from './pipes.component';
import { ConcatNameApellidoPipe } from './concat-name-apellido.pipe';


@NgModule({
  declarations: [
    PipesComponent,
    ConcatNameApellidoPipe
  ],
  imports: [
    CommonModule,
    PipesRoutingModule
  ],
  exports: [
    PipesComponent, ConcatNameApellidoPipe,
  ]
})
export class PipesModule { }
