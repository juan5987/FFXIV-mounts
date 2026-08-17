import { MountFilter } from '@domain/mounts/mount-filter.model';
import { Mount } from '@domain/mounts/mount.model';

export type MountCatalogStatus = 'idle' | 'loading' | 'success' | 'error';

export interface MountCatalogState {
  readonly mounts: readonly Mount[];
  readonly filter: MountFilter;
  readonly status: MountCatalogStatus;
  readonly error: 'load-failed' | null;
}

export function createInitialMountCatalogState(): MountCatalogState {
  return {
    mounts: [],
    filter: {
      query: '',
      expansionId: null,
    },
    status: 'idle',
    error: null,
  };
}
