import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { loginFeatureName, loginReducer } from './login.reducer';
import { alumnoFeatureName, reducer } from '../../usuarios/store/usuario.reducer';

interface RootState {}

export const rootReducer: ActionReducerMap<RootState> = {
  [loginFeatureName]: loginReducer,
  [alumnoFeatureName]: reducer
};

    