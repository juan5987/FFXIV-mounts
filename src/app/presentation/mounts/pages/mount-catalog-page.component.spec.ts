import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { EXPANSION_CATALOG } from '@domain/mounts/expansion.catalog';

import { MountCatalogPresenter } from '../presenters/mount-catalog.presenter';
import type { MountCatalogViewModel } from '../view-models/mount-catalog.view-model';
import { MountCatalogPageComponent } from './mount-catalog-page.component';

const VIEW_MODEL: MountCatalogViewModel = {
  status: 'ready',
  query: '',
  selectedExpansionValue: '',
  options: EXPANSION_CATALOG,
  isEmpty: false,
  items: [
    {
      id: 1,
      title: 'Chocobo destrier',
      description: 'Une monture de compagnie.',
      imageSrc: 'https://example.test/chocobo.png',
      imageAlt: 'Icone de la monture Chocobo destrier',
    },
    {
      id: 2,
      title: 'Faucon flamboyant',
      description: 'Une monture ailee.',
      imageSrc: 'https://example.test/faucon.png',
      imageAlt: 'Icone de la monture Faucon flamboyant',
    },
  ],
};

describe('MountCatalogPageComponent', () => {
  it('delegates page interactions to the presenter', async () => {
    const presenter = {
      viewModel: signal(VIEW_MODEL).asReadonly(),
      load: vi.fn<() => Promise<void>>(() => Promise.resolve()),
      setQuery: vi.fn<(value: string) => void>(),
      setExpansion: vi.fn<(value: string) => void>(),
    };

    await TestBed.configureTestingModule({
      imports: [MountCatalogPageComponent],
      providers: [{ provide: MountCatalogPresenter, useValue: presenter }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MountCatalogPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-mount-card')).toHaveLength(2);
    expect(fixture.nativeElement.querySelector('form[role="search"]')?.getAttribute('aria-label')).toBe('Filtrer les montures');
    expect(fixture.nativeElement.querySelector('[aria-live="polite"]')?.textContent).toContain('2 montures affichées');

    const component = fixture.componentInstance;
    component.onQueryChange('faucon');
    component.onExpansionChange('Heavensward');
    component.onExpansionChange('unknown');
    component.onExpansionChange('');
    component.onRetry();

    expect(presenter.load).toHaveBeenCalledTimes(2);
    expect(presenter.setQuery).toHaveBeenCalledWith('faucon');
    expect(presenter.setExpansion).toHaveBeenNthCalledWith(1, 'Heavensward');
    expect(presenter.setExpansion).toHaveBeenNthCalledWith(2, 'unknown');
    expect(presenter.setExpansion).toHaveBeenNthCalledWith(3, '');
  });

  it('renders loading, error and empty states with accessible feedback', async () => {
    const viewModel = signal<MountCatalogViewModel>({ ...VIEW_MODEL, status: 'loading' });
    const presenter = {
      viewModel,
      load: vi.fn<() => Promise<void>>(() => Promise.resolve()),
      setQuery: vi.fn<(value: string) => void>(),
      setExpansion: vi.fn<(value: string) => void>(),
    };

    await TestBed.configureTestingModule({
      imports: [MountCatalogPageComponent],
      providers: [{ provide: MountCatalogPresenter, useValue: presenter }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MountCatalogPageComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.catalog__skeleton')).toHaveLength(6);

    viewModel.set({ ...VIEW_MODEL, status: 'error' });
    fixture.detectChanges();

    const retry = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    retry.click();
    expect(presenter.load).toHaveBeenCalledTimes(2);

    viewModel.set({ ...VIEW_MODEL, isEmpty: true });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Aucune monture');
  });
});
