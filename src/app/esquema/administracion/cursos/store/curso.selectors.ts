import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCurso from './curso.reducer';

export const selectCursoState = createFeatureSelector<fromCurso.State>(
  fromCurso.cursoFeatureKey
);


export const selectCursosLoading = createSelector(
  selectCursoState,
  (state) => state.isLoading
)


export const selectCursos = createSelector(selectCursoState, (state) => state.cursos)

export const selectCursosError = createSelector(selectCursoState, (state) => state.error)