import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { AlumnoDetalleComponent } from './pages/alumno-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent
  },
  {
  path: ':id',
  component: AlumnoDetalleComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
