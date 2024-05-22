import { ActionReducerMap} from '@ngrx/store';
import { loginFeatureName, loginReducer } from './login.reducer';
import { alumnoFeatureName, reducer } from '../../usuarios/store/usuario.reducer';
import { cursoFeatureName, reducerCurso } from '../../cursos/store/curso.reducer';
import { inscripcionFeatureName, reducerInscripcion } from '../../inscripciones/store/inscripcion.reducer';

interface RootState {}

export const rootReducer: ActionReducerMap<RootState> = {
  [loginFeatureName]: loginReducer,
  [alumnoFeatureName]: reducer,
  [cursoFeatureName]: reducerCurso,
  [inscripcionFeatureName]: reducerInscripcion
};

    