import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripcion from './inscripcion.reducer';

export const selectInscripcionState = createFeatureSelector<fromInscripcion.InscripcionesState>(
  fromInscripcion.inscripcionFeatureKey
);



export const selectInscripcionesLoading = createSelector(
  selectInscripcionState,
  (state) => state.isLoading
)

export const selectInscripciones = createSelector(selectInscripcionState, (state) => state.inscripcion)

export const selectInscripcionesError = createSelector(selectInscripcionState, (state) => state.error)