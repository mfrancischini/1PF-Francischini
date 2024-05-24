import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdmin from './admin.reducer';

export const selectAdminState = createFeatureSelector<fromAdmin.AdminState>(
  fromAdmin.adminFeatureKey
);


export const selectAdminLoading = createSelector(
  selectAdminState,
  (state) => state.isLoading
)


export const selectAdmin = createSelector(selectAdminState, (state) => state.admin)

export const selectAdminError = createSelector(selectAdminState, (state) => state.error)