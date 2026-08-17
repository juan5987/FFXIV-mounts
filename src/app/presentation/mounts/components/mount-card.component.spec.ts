import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import type { MountCardViewModel } from '../view-models/mount-catalog.view-model';
import { MountCardComponent } from './mount-card.component';

const MOUNT: MountCardViewModel = {
  id: 1,
  title: 'Chocobo destrier',
  description: 'Une monture de compagnie.',
  imageSrc: 'https://xivapi.example.test/i/068000/068001.png',
  imageAlt: 'Icone de la monture Chocobo destrier',
};

describe('MountCardComponent', () => {
  it('renders semantic mount information and a useful image alternative', async () => {
    await TestBed.configureTestingModule({
      imports: [MountCardComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MountCardComponent);
    fixture.componentRef.setInput('item', MOUNT);
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;

    expect(fixture.nativeElement.querySelector('article')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain(MOUNT.title);
    expect(fixture.nativeElement.textContent).toContain(MOUNT.title);
    expect(fixture.nativeElement.textContent).toContain(MOUNT.description);
    expect(image.alt).toBe(MOUNT.imageAlt);
    expect(image.getAttribute('loading')).toBe('lazy');
  });
});
