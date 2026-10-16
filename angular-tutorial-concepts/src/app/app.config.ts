import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';
import { RoutegaurdAuth } from './services/routegaurd-auth';
import { provideStore } from '@ngrx/store';
import { userReducer } from './ngrx/userReducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './ngrx/userEffects';
import { counterReducer } from './ngrx/counter-reducer';
import { employeeReducer } from './ngrx/employee-reducer';
import { loadEmployeesEffect } from './ngrx/employee-effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ 
      user: userReducer,
      counter: counterReducer,
      employees: employeeReducer
     }), //ngrx reducer imports
  //  provideEffects([UserEffects]),
  //  provideEffects(loadEmployeesEffect)

   provideEffects({
    // UserEffects,
      loadEmployeesEffect
    })
]
};
