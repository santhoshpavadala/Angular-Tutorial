import { CanDeactivateFn } from '@angular/router';
import { AdminUsers } from '../app-features/admin-layout/admin-users/admin-users';
import { CanComponentDeactivate } from '../models/can-component-deactivate';

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate();
};
