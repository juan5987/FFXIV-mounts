import type { Mount } from '../../domain/mounts/mount.model';

export type LoadMountCatalogResult =
  | { readonly kind: 'success'; readonly mounts: readonly Mount[] }
  | { readonly kind: 'failure'; readonly reason: 'unavailable' };
