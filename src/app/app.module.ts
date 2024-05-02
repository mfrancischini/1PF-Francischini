import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdministracionModule } from './esquema/administracion/administracion.module';
import { HttpClientModule } from '@angular/common/http';
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
        HttpClientModule

    ]
})
export class AppModule { }
