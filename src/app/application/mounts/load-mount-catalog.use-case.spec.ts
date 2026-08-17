import { describe, expect, it } from 'vitest';

import type { Mount } from '../../domain/mounts/mount.model';
import { MountRepository } from '../../domain/mounts/mount.repository';
import { LoadMountCatalogUseCase } from './load-mount-catalog.use-case';

describe('LoadMountCatalogUseCase', () => {
  const mounts: readonly Mount[] = [
    {
      id: 1,
      name: 'Company Chocobo',
      description: 'A mount.',
      iconUrl: 'https://xivapi.com/i/000000/000001.png',
      expansionId: null,
    },
  ];

  it('returns mounts from the repository', async () => {
    const repository = { findAll: async () => mounts } as MountRepository;

    await expect(new LoadMountCatalogUseCase(repository).execute()).resolves.toEqual({
      kind: 'success',
      mounts,
    });
  });

  it('normalizes repository failures', async () => {
    const repository = {
      findAll: async () => Promise.reject(new Error('offline')),
    } as MountRepository;

    await expect(new LoadMountCatalogUseCase(repository).execute()).resolves.toEqual({
      kind: 'failure',
      reason: 'unavailable',
    });
  });
});
