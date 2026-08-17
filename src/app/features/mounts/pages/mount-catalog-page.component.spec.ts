import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { MOUNTS_GATEWAY, MountsGateway } from '../data-access/mounts.gateway';
import { Mount } from '../domain/mount.model';
import { MountCatalogStore } from '../state/mount-catalog.store';
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
  it('loads mounts and applies user search input', async () => {
    await TestBed.configureTestingModule({
      imports: [MountCatalogPageComponent],
      providers: [
        MountCatalogStore,
        {
          provide: MOUNTS_GATEWAY,
          useValue: { listMounts: () => of(MOUNTS) } satisfies MountsGateway,
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(MountCatalogPageComponent);
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
