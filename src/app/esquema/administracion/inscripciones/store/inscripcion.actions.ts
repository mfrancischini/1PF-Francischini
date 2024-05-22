import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateInscripcionesPayload, IInscripciones } from '../../models';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Load Inscripcions': emptyProps(),
    'Load Inscripcions Success': props<{ data: IInscripciones[] }>(),
    'Load Inscripcions Failure': props<{ error: unknown }>(),
    
    'Create Inscripcions': props<{ data: ICreateInscripcionesPayload }>(),
    'Create Inscripcions Success': props<{ data: IInscripciones }>(),
    'Create Inscripcions Failure': props<{ error: unknown }>(),

    'Delete Inscripcions By Id': props<{ id: string }>(),
    'Delete Inscripcions By Id Success': props<{ data: IInscripciones }>(),
    'Delete Inscripcions By Id Failure': props<{ error: unknown }>(),

    'Update Inscripcions': props<{ id: string, payload: ICreateInscripcionesPayload }>(),
    'Update Inscripcions Success': props<{ data: IInscripciones }>(),
    'Update Inscripcions Failure': props<{ error: unknown }>(),
  }
});
