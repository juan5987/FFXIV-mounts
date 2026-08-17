import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { APP_CONFIG, environment } from './core/config/app-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(APP_ROUTES, withHashLocation()),
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
  ],
};
