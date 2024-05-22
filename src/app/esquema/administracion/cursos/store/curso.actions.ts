import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateCursosPayload, ICursos } from '../../models';

export const CursoActions = createActionGroup({
  source: 'Curso',
  events: {
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ data: ICursos[] }>(),
    'Load Cursos Failure': props<{ error: unknown }>(),
    'Create Cursos': props<{ data: ICreateCursosPayload }>(),
    'Create Cursos Success': props<{ data: ICursos }>(),
    'Create Cursos Failure': props<{ error: unknown }>(),
    'Delete Cursos By Id': props<{ id: string }>(),
    'Delete Cursos By Id Success': props<{ data: ICursos }>(),
    'Delete Cursos By Id Failure': props<{ error: unknown }>(),

    'Update Cursos': props<{ id: string, payload: ICreateCursosPayload }>(),
    'Update Cursos Success': props<{ data: ICursos }>(),
    'Update Cursos Failure': props<{ error: unknown }>(),
  }
});
