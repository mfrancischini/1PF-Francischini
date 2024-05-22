import { CursoState } from '../../cursos/store/curso.reducer';
import { InscripcionesState } from '../../inscripciones/store/inscripcion.reducer';
import { UsuarioState } from '../../usuarios/store/usuario.reducer';
import { LoginState } from './login.reducer';



export interface AppState {
  login: LoginState;
  usurio: UsuarioState;
  curso : CursoState;
  inscripcion : InscripcionesState;

}