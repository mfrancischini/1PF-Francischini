import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CursosModule } from './cursos/cursos.module';
import {MatButtonModule} from '@angular/material/button';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PipesModule } from './pipes/pipes.module';
import { AumentarFontsDirective } from './directivas/aumentar-fonts.directive';





@NgModule({
  declarations: [
    AdministracionComponent,
    AumentarFontsDirective,
    
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    CursosModule,
    MatButtonModule,
    UsuariosModule,
    PipesModule

    
  ],
  exports: [AdministracionComponent]
})
export class AdministracionModule { }
