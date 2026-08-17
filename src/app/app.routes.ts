import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@presentation/mounts/pages/mount-catalog-page.component').then(
        (module) => module.MountCatalogPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
