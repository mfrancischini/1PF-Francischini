import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { autenticacionGuard } from './core/guards/autenticacion.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    data: {
      title: 'Login',
    },
    pathMatch: 'full'
  },

  {
    path: 'alumnos',
    data: {
      title: 'Alumnos',
    },
    canActivate: [autenticacionGuard],
    loadChildren: () => import('./esquema/administracion/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'cursos',
    data: {
      title: 'Cursos',
    },
    canActivate: [autenticacionGuard],
    loadChildren: () => import('./esquema/administracion/cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'login',
    data: {
      title: 'Login',
    },
    loadChildren: () => import('./esquema/administracion/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'inscripciones',
    data: {
      title: 'Inscripciones',
    },
    canActivate: [autenticacionGuard],
    loadChildren: () => import('./esquema/administracion/inscripciones/inscripciones.module').then(m => m.InscripcionesModule)
  }
  ,
  {
    path: '**',
    redirectTo: 'alumnos',
    data: {
      title: 'Alumnos',
    },
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
