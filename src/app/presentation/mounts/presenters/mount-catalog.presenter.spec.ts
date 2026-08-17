import { describe, expect, it } from 'vitest';

import { MountRepository } from '../../../domain/mounts/mount.repository';
import { LoadMountCatalogUseCase } from '../../../application/mounts/load-mount-catalog.use-case';
import { MountCatalogPresenter } from './mount-catalog.presenter';

describe('MountCatalogPresenter', () => {
  const repository = {
    findAll: async () => [
      {
        id: 1,
        name: 'Company Chocobo',
        description: 'A loyal companion.',
        iconUrl: 'https://xivapi.com/i/000000/000001.png',
        expansionId: null,
      },
    ],
  } as MountRepository;

  it('exposes a presentation-only view model after loading', async () => {
    const presenter = new MountCatalogPresenter(new LoadMountCatalogUseCase(repository));

    await presenter.load();

    expect(presenter.viewModel()).toMatchObject({
      status: 'ready',
      query: '',
      selectedExpansionValue: '',
      isEmpty: false,
      items: [
        {
          title: 'Company Chocobo',
          imageAlt: 'Icône de la monture Company Chocobo',
        },
      ],
    });
  });

  it('treats invalid raw expansion values as no selection', () => {
    const presenter = new MountCatalogPresenter(new LoadMountCatalogUseCase(repository));

    presenter.setExpansion('not-an-expansion');

    expect(presenter.viewModel().selectedExpansionValue).toBe('');
  });
});
