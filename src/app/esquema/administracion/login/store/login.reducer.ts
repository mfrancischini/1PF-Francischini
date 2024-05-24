import { createReducer, on } from "@ngrx/store";
import { IUsuario } from "../../models";
import { loginActions } from "./login.actions";



export interface LoginState{
    loginUser: null | IUsuario;
}

const initialState: LoginState = {
    loginUser: null

}

const MOCK_AUTH_USERS: IUsuario []= [{
    id: "1",
    nombre: 'admin',
    password: '123456',
    role: 'ADMIN',
  },
  {
    id: "2",
    nombre: 'alumno',
    password: '123456',
    role: 'ALUMNO',
  },
];

export const loginFeatureName = 'login'

export const loginReducer = createReducer(
  initialState,
  on(loginActions.login, (state, action) => {
      const user = MOCK_AUTH_USERS.find(
          user => user.nombre === action.data.username && user.password === action.data.password
      );

      if (!user) {
          alert('Correo o password incorrectos');
          return state;
      } else {
          localStorage.setItem('accessToken', '21397873403248093420');
          return { 
              loginUser: user 
          };
      }
  }),

    on(loginActions.logout, () => {

      localStorage.removeItem('accessToken');
      return initialState
    })
)
