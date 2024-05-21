// src/app/store/app.state.ts

import { LoginState } from './login.reducer';

export interface AppState {
  login: LoginState;
  // Añade aquí otros estados que tengas en tu aplicación
}