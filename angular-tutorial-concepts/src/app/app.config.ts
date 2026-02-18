import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RoutegaurdAuth } from './services/routegaurd-auth';
import { authInterceptor } from './interceptors/auth-interceptor';
import { provideStore } from '@ngrx/store';
import { userReducer } from './ngrx/userReducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './ngrx/userEffects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ user: userReducer }), //ngrx reducer imports
    provideEffects([UserEffects])
]
};
