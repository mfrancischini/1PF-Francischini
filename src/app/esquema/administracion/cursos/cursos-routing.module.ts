import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursoDetalleComponent } from './pages/cursos-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: CursosComponent
  },
  {

    path: ':id',
    component: CursoDetalleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
