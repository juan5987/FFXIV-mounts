import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { LoadMountCatalogUseCase } from '@application/mounts/load-mount-catalog.use-case';
import { MountRepository } from '@domain/mounts/mount.repository';
import { APP_CONFIG } from '@infrastructure/config/app-config';
import { XivApiMountRepository } from '@infrastructure/http/xivapi/xivapi-mount.repository';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(APP_ROUTES, withHashLocation()),
    XivApiMountRepository,
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
    {
      provide: MountRepository,
      useExisting: XivApiMountRepository,
    },
    {
      provide: LoadMountCatalogUseCase,
      useFactory: (mountRepository: MountRepository) => new LoadMountCatalogUseCase(mountRepository),
      deps: [MountRepository],
    },
  ],
};
