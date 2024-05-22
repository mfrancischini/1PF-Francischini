import { createFeature, createReducer, on } from '@ngrx/store';
import { CursoActions } from './curso.actions';
import { ICursos } from '../../models';

export const cursoFeatureKey = 'curso';

export interface CursoState {
  cursos : ICursos[],
  isLoading: boolean,
  error: unknown ,
}

export const initialState: CursoState = {
  cursos: [],
  isLoading: false,
  error: null
};

export const cursoFeatureName = 'curso';

export const reducerCurso = createReducer(
  initialState,
  on(CursoActions.loadCursos, (state) => {
    return {...state, isLoading: true}
  }),
  on(CursoActions.loadCursosSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: null,
      cursos: action.data
    }
  }),
  on(CursoActions.loadCursosFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

  on(CursoActions.createCursos, (state, action) => {
    return {
      ...state,
      isLoading: true,
    }
  }),


  on(CursoActions.createCursosSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      cursos: [...state.cursos, action.data]
    }
  }),


  on(CursoActions.createCursosFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

  on(CursoActions.deleteCursosById, (state, action) => {
    return {
      ...state,
      isLoading: true,
    }
  }),


  on(CursoActions.deleteCursosByIdSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      cursos: state.cursos.filter(curso => curso.id !== action.data.id)
    }
  }),


  on(CursoActions.deleteCursosByIdFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

  
  on(CursoActions.updateCursos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CursoActions.updateCursosSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    cursos: state.cursos.map((curso) =>
      curso.id === data.id ? { ...curso, ...data } : curso
    ),
    error: null
  })),
  on(CursoActions.updateCursosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);

export const cursoFeature = createFeature({
  name: cursoFeatureKey,
  reducer: reducerCurso ,
});

