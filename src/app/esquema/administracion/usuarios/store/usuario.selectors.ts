import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuario from './usuario.reducer';

export const selectUsuarioState = createFeatureSelector<fromUsuario.State>(
  fromUsuario.usuarioFeatureKey
);


export const selectIsLoading = createSelector(
  selectUsuarioState,
  (state) => {return state.isloading}
)

export const selectUsuarios = createSelector(
  selectUsuarioState,
  (state) => {return state.usuarios}
)