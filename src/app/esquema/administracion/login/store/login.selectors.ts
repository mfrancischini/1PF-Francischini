import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState, loginFeatureName } from "./login.reducer";


export const loginState = createFeatureSelector<LoginState>(loginFeatureName)

export const loginUser = createSelector(loginState, (state) => state.loginUser)

