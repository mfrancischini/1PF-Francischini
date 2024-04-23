import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  },
  {
    path: 'alumnos',
    loadChildren: () => import( './esquema/administracion/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'cursos',
   loadChildren: () => import( './esquema/administracion/cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'clases',
    loadChildren: () => import( './esquema/administracion/clases/clases.module').then(m => m.ClasesModule)}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
