import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { Mount } from '@domain/mounts/mount.model';
import { MountRepository } from '@domain/mounts/mount.repository';

import { MountCatalogFacade } from './mount-catalog.facade';

const MOUNTS: readonly Mount[] = [
  {
    id: 1,
    name: 'Chocobo destrier',
    description: 'Une monture de compagnie.',
    iconUrl: 'https://example.test/chocobo.png',
    expansionId: 'A Realm Reborn',
  },
  {
    id: 2,
    name: 'Faucon flamboyant',
    description: 'Une monture ailée.',
    iconUrl: 'https://example.test/faucon.png',
    expansionId: 'Heavensward',
  },
];

function createFacade(findAll: () => Promise<readonly Mount[]>): MountCatalogFacade {
  TestBed.configureTestingModule({
    providers: [
      MountCatalogFacade,
      {
        provide: MountRepository,
        useValue: { findAll },
      },
    ],
  });

  return TestBed.inject(MountCatalogFacade);
}

describe('MountCatalogFacade', () => {
  it('orchestrates loading and delegates filtering to the domain', async () => {
    const findAll = vi.fn(() => Promise.resolve(MOUNTS));
    const facade = createFacade(findAll);

    await facade.load();
    facade.setQuery('faucon');
    facade.setExpansion('Heavensward');

    expect(findAll).toHaveBeenCalledOnce();
    expect(facade.state().status).toBe('success');
    expect(facade.filteredMounts()).toEqual([MOUNTS[1]]);
  });

  it('exposes a stable application error and supports retry', async () => {
    const findAll = vi
      .fn<() => Promise<readonly Mount[]>>()
      .mockRejectedValueOnce(new Error('network failure'))
      .mockResolvedValueOnce(MOUNTS);
    const facade = createFacade(findAll);

    await facade.load();
    expect(facade.state().error).toBe('load-failed');

    await facade.retry();
    expect(facade.state().status).toBe('success');
    expect(findAll).toHaveBeenCalledTimes(2);
  });
});
