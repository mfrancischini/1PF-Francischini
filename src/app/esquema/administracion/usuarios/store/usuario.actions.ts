import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAlumnos, ICreateAlumnosPayload, IUsuario } from '../../models';

export const UsuarioActions = createActionGroup({
  source: 'Usuario',
  events: {
    'Load Usuarios': emptyProps(),
    'Load Usuarios Success': props<{ data: IAlumnos[] }>(),
    'Load Usuarios Failure': props<{ error: unknown }>(),

    'Create Usuarios': props<{ payload: ICreateAlumnosPayload }>(),
    'Create Usuarios Success': props<{ data: IAlumnos }>(),
    'Create Usuarios Failure': props<{ error: unknown }>(),

    'Delete Usuarios': props<{ id: string }>(),
    'Delete Usuarios Success': props<{ data: IAlumnos }>(),
    'Delete Usuarios Failure': props<{ error: unknown }>(),

    'Update Usuarios': props<{ id: string, payload: ICreateAlumnosPayload }>(),
    'Update Usuarios Success': props<{ data: IAlumnos }>(),
    'Update Usuarios Failure': props<{ error: unknown }>(),

  }
});
