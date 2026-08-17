import { TestBed } from '@angular/core/testing';
import { Observable, Subject, of, throwError } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';

import { Mount } from '../domain/mount.model';
import { MOUNTS_GATEWAY, MountsGateway } from '../data-access/mounts.gateway';
import { MountCatalogStore } from './mount-catalog.store';

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

function createStore(listMounts: () => Observable<readonly Mount[]>): MountCatalogStore {
  TestBed.configureTestingModule({
    providers: [
      MountCatalogStore,
      {
        provide: MOUNTS_GATEWAY,
        useValue: { listMounts } satisfies MountsGateway,
      },
    ],
  });

  return TestBed.inject(MountCatalogStore);
}

describe('MountCatalogStore', () => {
  it('loads once and derives combined filters without duplicating state', () => {
    const pendingResponse = new Subject<readonly Mount[]>();
    const listMounts = vi.fn(() => pendingResponse.asObservable());
    const store = createStore(listMounts);

    store.load();
    store.load();

    expect(store.state().status).toBe('loading');
    expect(listMounts).toHaveBeenCalledTimes(1);

    pendingResponse.next(MOUNTS);
    pendingResponse.complete();
    store.setQuery('faucon');
    store.setExpansion('Heavensward');

    expect(store.state().status).toBe('success');
    expect(store.filteredMounts()).toEqual([MOUNTS[1]]);
  });

  it('keeps filters and exposes a safe public error message on failure', () => {
    const store = createStore(() => throwError(() => new Error('network failure')));

    store.setQuery('chocobo');
    store.load();

    expect(store.state()).toMatchObject({
      status: 'error',
      errorMessage: 'Le catalogue est indisponible pour le moment.',
      filter: { query: 'chocobo' },
    });
  });

  it('retries after an error', () => {
    const listMounts = vi.fn(() => of(MOUNTS));
    const store = createStore(listMounts);

    store.load();
    store.retry();

    expect(listMounts).toHaveBeenCalledTimes(2);
    expect(store.state().status).toBe('success');
  });
});
