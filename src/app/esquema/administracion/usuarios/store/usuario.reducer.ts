import { createFeature, createReducer, on } from '@ngrx/store';
import { UsuarioActions } from './usuario.actions';
import { IAlumnos } from '../../models';

export const usuarioFeatureKey = 'usuario';

export interface State {
  usuarios: IAlumnos[];
  isloading: boolean;
  error: unknown,
}

export const initialState: State = {
  usuarios: [],
  isloading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UsuarioActions.loadUsuarios, (state) => {
    return{
      ...state,
      isloading: true
    }
  }), 

  on(UsuarioActions.loadUsuariosSuccess, (state, action) => {
    return{
      ...state,
      isloading: false,
      usuarios: action.data

    }
  }),
  on(UsuarioActions.loadUsuariosFailure, (state, action) => {
    return{
      ...state,
      isloading: false,
      error: action.error
    }
  }),


  on(UsuarioActions.createUsuarios, (state) => {
    return{
      ...state,
      isloading: true,
 
    }
  }),


  on(UsuarioActions.createUsuariosSuccess, (state, action) => {
    return{
      ...state,
      isloading: false,
      usuarios: [...state.usuarios, action.data]
 
    }
  }),
  on(UsuarioActions.createUsuariosFailure, (state, action) => {
    return{
      ...state,
      isloading: false,
      error: action.error
    }
  }),

  on(UsuarioActions.deleteUsuarios, (state, action) => {
    return{
      ...state,
      isloading: true,
    }
  }),

  on(UsuarioActions.deleteUsuariosSuccess, (state, action) => {
    return{
      ...state,
      isloading: false,
      usuarios: state.usuarios.filter((user) => user.id !== action.data.id)
    }
  }),

  on(UsuarioActions.deleteUsuariosFailure, (state, action) => {
    return{
      ...state,
      isloading: false,
      error: action.error
    }
  }),


    on(UsuarioActions.updateUsuarios, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
  
    on(UsuarioActions.updateUsuariosSuccess, (state, { data }) => ({
      ...state,
      loading: false,
      usuarios: state.usuarios.map((usuario) =>
        usuario.id === data.id ? { ...usuario, ...data } : usuario
      ),
      error: null
    })),
    on(UsuarioActions.updateUsuariosFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    }))

);

export const usuarioFeature = createFeature({
  name: usuarioFeatureKey,
  reducer,
});

