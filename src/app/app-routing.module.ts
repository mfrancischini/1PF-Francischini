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
    path: 'forms',
    loadChildren: () => import( './esquema/administracion/cursos/components/curso-form/curso-form.module').then(m => m.CursosFormModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
