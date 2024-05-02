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
import { LoginModule } from "./login/login.module";



@NgModule({
    declarations: [
        AdministracionComponent,
        AumentarFontsDirective,
    ],
    exports: [AdministracionComponent],
    imports: [
        CommonModule,
        AdministracionRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        UsuariosModule,
        PipesModule,
        LoginModule,
        CursosModule
    ]
})
export class AdministracionModule { }
