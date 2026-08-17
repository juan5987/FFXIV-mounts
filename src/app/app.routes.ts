import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { LoadMountCatalogUseCase } from '@application/mounts/load-mount-catalog.use-case';
import { MountCatalogPresenter } from '@presentation/mounts/presenters/mount-catalog.presenter';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@presentation/mounts/pages/mount-catalog-page.component').then(
        (module) => module.MountCatalogPageComponent,
      ),
    providers: [
      {
        provide: MountCatalogPresenter,
        useFactory: () => new MountCatalogPresenter(inject(LoadMountCatalogUseCase)),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
