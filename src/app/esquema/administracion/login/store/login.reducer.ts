import { createReducer, on } from "@ngrx/store";
import { IUsuario } from "../../models";
import { loginActions } from "./login.actions";



export interface LoginState{
    loginUser: null | IUsuario;
}

const initialState: LoginState = {
    loginUser: null

}

const MOCK_AUTH_USER: IUsuario = {
    id: "1",
    nombre: 'mariano',
    email: 'mariano@mail.com',
    role: 'ALUMNO',
  };

export const loginFeatureName = 'login'

export const loginReducer = createReducer(
    initialState,
    on(loginActions.login, (state, action) =>{

        
        if (action.data.username !== 'mariano' || action.data.password !== '123456') {
            alert('Correo o password incorrectos');
            return state
          } else {
            //this._authUser$.next(this.MOCK_AUTH_USER);
            localStorage.setItem(
              'accessToken',
              '21397873403248093420'
            );
         //   this.router.navigate(['alumnos']);
       
          return{ 
            loginUser: MOCK_AUTH_USER
          }
        }
    }),


    on(loginActions.logout, () => {

      localStorage.removeItem('accessToken');
      return initialState
    })
)