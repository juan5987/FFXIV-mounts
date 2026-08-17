import { Provider } from '@angular/core';

import { MOUNTS_GATEWAY } from './data-access/mounts.gateway';
import { XivApiMountsService } from './data-access/xivapi-mounts.service';
import { MountCatalogStore } from './state/mount-catalog.store';

export const MOUNTS_FEATURE_PROVIDERS: Provider[] = [
  MountCatalogStore,
  XivApiMountsService,
  {
    provide: MOUNTS_GATEWAY,
    useExisting: XivApiMountsService,
  },
];
