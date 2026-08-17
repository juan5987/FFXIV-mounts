import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { MountCatalogFacade } from '@application/mounts/mount-catalog.facade';
import { Mount } from '@domain/mounts/mount.model';
import { MountRepository } from '@domain/mounts/mount.repository';

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
  it('renders the facade state and delegates user search', async () => {
    await TestBed.configureTestingModule({
      imports: [MountCatalogPageComponent],
      providers: [
        MountCatalogFacade,
        {
          provide: MountRepository,
          useValue: { findAll: () => Promise.resolve(MOUNTS) },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(MountCatalogPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-mount-card')).toHaveLength(2);

    const input = fixture.nativeElement.querySelector('#mount-search') as HTMLInputElement;
    input.value = 'faucon';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-mount-card')).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('Faucon flamboyant');
  });
});
