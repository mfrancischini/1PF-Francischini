import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IDatosLogin } from "../../models";



export const loginActions = createActionGroup({
    source: 'Login',
    events: {
      login:  props<{data: IDatosLogin}>(),
      logout:  emptyProps(),
    },
})