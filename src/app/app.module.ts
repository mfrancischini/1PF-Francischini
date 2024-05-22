import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdministracionModule } from './esquema/administracion/administracion.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './esquema/administracion/login/store';
import { UsuarioEffects } from './esquema/administracion/usuarios/store/usuario.effects';
import { CursoEffects } from './esquema/administracion/cursos/store/curso.effects';
import { InscripcionEffects } from './esquema/administracion/inscripciones/store/inscripcion.effects';


@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AdministracionModule,
        HttpClientModule,
        StoreModule.forRoot(rootReducer
        ), 
        EffectsModule.forRoot([UsuarioEffects, CursoEffects, InscripcionEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })

    ]
})
export class AppModule { }
