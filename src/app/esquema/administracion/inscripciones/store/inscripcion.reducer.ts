import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';
import { IInscripciones } from '../../models';

export const inscripcionFeatureKey = 'inscripcion';

export interface InscripcionesState {

  inscripcion: IInscripciones[],
  isLoading: boolean,
  error: unknown
}

export const initialState: InscripcionesState = {
  inscripcion: [],
  isLoading: false,
  error: null
};

export const inscripcionFeatureName = 'inscripcion';
export const reducerInscripcion = createReducer(
  initialState,
  on(InscripcionActions.loadInscripcions, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(InscripcionActions.loadInscripcionsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      inscripcion: action.data
  }}),


  on(InscripcionActions.loadInscripcionsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

  
  on(InscripcionActions.createInscripcions, (state, action) => {
    return {
      ...state,
      isLoading: true,
    }
  }),


  on(InscripcionActions.createInscripcionsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      inscripcion: [...state.inscripcion, action.data]
    }
  }),


  on(InscripcionActions.createInscripcionsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),



on(InscripcionActions.deleteInscripcionsById, (state, action) => {
  return {
    ...state,
    isLoading: true,
  }
}),


on(InscripcionActions.deleteInscripcionsByIdSuccess, (state, action) => {
  return {
    ...state,
    isLoading: false,
    inscripcion: state.inscripcion.filter(inscripcion => inscripcion.id !== action.data.id)
  }
}),


on(InscripcionActions.deleteInscripcionsByIdFailure, (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.error
  }
}),


on(InscripcionActions.updateInscripcions, (state) => ({
  ...state,
  loading: true,
  error: null
})),

on(InscripcionActions.updateInscripcionsSuccess, (state, { data }) => ({
  ...state,
  loading: false,
  inscripcion: state.inscripcion.map((inscripcion) =>
    inscripcion.id === data.id ? { ...inscripcion, ...data } : inscripcion
  ),
  error: null
})),
on(InscripcionActions.updateInscripcionsFailure, (state, { error }) => ({
  ...state,
  loading: false,
  error: error
}))
);

export const inscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer: reducerInscripcion,
});

