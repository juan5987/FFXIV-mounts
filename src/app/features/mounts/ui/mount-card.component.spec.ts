import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { Mount } from '../domain/mount.model';
import { MountCardComponent } from './mount-card.component';

const MOUNT: Mount = {
  id: 1,
  name: 'Chocobo destrier',
  description: 'Une monture de compagnie.',
  iconUrl: 'https://xivapi.example.test/i/068000/068001.png',
  expansionId: 'A Realm Reborn',
};

describe('MountCardComponent', () => {
  it('renders semantic mount information and a useful image alternative', async () => {
    await TestBed.configureTestingModule({
      imports: [MountCardComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MountCardComponent);
    fixture.componentRef.setInput('mount', MOUNT);
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;

    expect(fixture.nativeElement.textContent).toContain(MOUNT.name);
    expect(fixture.nativeElement.textContent).toContain(MOUNT.description);
    expect(image.alt).toBe('Icône de la monture Chocobo destrier');
    expect(image.getAttribute('loading')).toBe('lazy');
  });
});
