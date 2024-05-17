import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { autenticacionGuard } from './core/guards/autenticacion.guard';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'alumnos',
    canActivate: [autenticacionGuard],
    loadChildren: () => import( './esquema/administracion/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'cursos',
    canActivate: [autenticacionGuard],
   loadChildren: () => import( './esquema/administracion/cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'login',
   loadChildren: () => import( './esquema/administracion/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'inscripciones',
    canActivate: [autenticacionGuard],
    loadChildren: () => import( './esquema/administracion/inscripciones/inscripciones.module').then(m => m.InscripcionesModule)}
    ,
    { 
      path: '**',
      redirectTo: 'alumnos',
      pathMatch: 'full'
    }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
