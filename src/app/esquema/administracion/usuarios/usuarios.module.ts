import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PipesModule } from '../pipes/pipes.module';
import { EffectsModule } from '@ngrx/effects';
import { UsuarioEffects } from './store/usuario.effects';
import { StoreModule } from '@ngrx/store';
import { usuarioFeature } from './store/usuario.reducer';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    UsuariosComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    PipesModule,
    StoreModule.forFeature(usuarioFeature),
    EffectsModule.forFeature([UsuarioEffects])
  ],
  exports: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
