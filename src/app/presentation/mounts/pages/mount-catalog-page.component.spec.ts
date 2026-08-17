import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { MountCatalogFacade } from '@application/mounts/mount-catalog.facade';
import { MountCatalogState } from '@application/mounts/models/mount-catalog-state.model';
import { EXPANSION_OPTIONS } from '@domain/mounts/expansion-options';
import { Mount } from '@domain/mounts/mount.model';

import { MountCatalogPageComponent } from './mount-catalog-page.component';

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

describe('MountCatalogPageComponent', () => {
  it('delegates page interactions to the facade', async () => {
    const state: MountCatalogState = {
      mounts: MOUNTS,
      filter: {
        query: '',
        expansionId: null,
      },
      status: 'success',
      error: null,
    };
    const facade = {
      state: signal(state).asReadonly(),
      filteredMounts: signal(MOUNTS).asReadonly(),
      expansionOptions: EXPANSION_OPTIONS,
      load: vi.fn<() => Promise<void>>(() => Promise.resolve()),
      retry: vi.fn<() => Promise<void>>(() => Promise.resolve()),
      setQuery: vi.fn<(query: string) => void>(),
      setExpansion: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MountCatalogPageComponent],
      providers: [
        {
          provide: MountCatalogFacade,
          useValue: facade,
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(MountCatalogPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-mount-card')).toHaveLength(2);

    const component = fixture.componentInstance;
    component.onQueryChange('faucon');
    component.onExpansionChange('Heavensward');
    component.onExpansionChange('unknown');
    component.onExpansionChange('all');
    component.onRetry();

    expect(facade.load).toHaveBeenCalledOnce();
    expect(facade.setQuery).toHaveBeenCalledWith('faucon');
    expect(facade.setExpansion).toHaveBeenNthCalledWith(1, 'Heavensward');
    expect(facade.setExpansion).toHaveBeenCalledTimes(2);
    expect(facade.setExpansion).toHaveBeenNthCalledWith(2, null);
    expect(facade.retry).toHaveBeenCalledOnce();
  });
});
