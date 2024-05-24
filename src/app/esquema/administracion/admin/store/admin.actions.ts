import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateAdminPayload, IUsuario } from '../../models';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'Load Admins': emptyProps(),
    'Load Admins Success': props<{ data: IUsuario[] }>(),
    'Load Admins Failure': props<{ error: unknown }>(),

    'Create Admins': props<{ data: ICreateAdminPayload }>(),
    'Create Admins Success': props<{ data: IUsuario }>(),
    'Create Admins Failure': props<{ error: unknown }>(),

    'Delete Admins By Id': props<{ id: string }>(),
    'Delete Admins By Id Success': props<{ data: IUsuario }>(),
    'Delete Admins By Id Failure': props<{ error: unknown }>(),

    'Update Admins': props<{ id: string, payload: ICreateAdminPayload }>(),
    'Update Admins Success': props<{ data: IUsuario }>(),
    'Update Admins Failure': props<{ error: unknown }>(),
  }
});
