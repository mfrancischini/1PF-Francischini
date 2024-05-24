import { createFeature, createReducer, on } from '@ngrx/store';
import { AdminActions } from './admin.actions';
import { IUsuario } from '../../models';

export const adminFeatureKey = 'admin';


export interface AdminState {
  admin: IUsuario[];
  isLoading: boolean;
  error: unknown;
}

// Estado inicial
export const initialState: AdminState = {
  admin: [],
  isLoading: false,
  error: null
};

export const adminFeatureName = 'admin';

// Reducer
export const reducerAdmin = createReducer(
  initialState,
  on(AdminActions.loadAdmins, state => ({
    ...state,
    isLoading: true
  })),
  on(AdminActions.loadAdminsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    admin: action.data
  })),
  on(AdminActions.loadAdminsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(AdminActions.createAdmins, state => ({
    ...state,
    isLoading: true
  })),
  on(AdminActions.createAdminsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    admin: [...state.admin, action.data]
  })),

  on(AdminActions.createAdminsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(AdminActions.deleteAdminsById, state => ({
    ...state,
    isLoading: true
  })),
  on(AdminActions.deleteAdminsByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    admin: state.admin.filter(admin => admin.id !== action.data.id)
  })),
  on(AdminActions.deleteAdminsByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(AdminActions.updateAdmins, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AdminActions.updateAdminsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    admin: state.admin.map(admin =>
      admin.id === action.data.id ? { ...admin, ...action.data } : admin
    ),
    error: null
  })),
  on(AdminActions.updateAdminsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);


export const adminFeature = createFeature({
  name: adminFeatureKey,
  reducer: reducerAdmin,
});
