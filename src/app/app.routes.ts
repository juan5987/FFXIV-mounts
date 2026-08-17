import { Routes } from '@angular/router';

import { MOUNTS_FEATURE_PROVIDERS } from './features/mounts/mounts-feature.providers';

export const APP_ROUTES: Routes = [
  {
    path: '',
    providers: MOUNTS_FEATURE_PROVIDERS,
    loadComponent: () =>
      import('./features/mounts/pages/mount-catalog-page.component').then(
        (module) => module.MountCatalogPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
