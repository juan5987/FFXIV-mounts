import { computed, signal } from '@angular/core';
import { LoadMountCatalogUseCase } from '../../../application/mounts/load-mount-catalog.use-case';
import { EXPANSION_CATALOG } from '../../../domain/mounts/expansion.catalog';
import { parseExpansionId } from '../../../domain/mounts/expansion-id';
import { filterMounts } from '../../../domain/mounts/filter-mounts';
import type { Mount } from '../../../domain/mounts/mount.model';
import type { ExpansionId } from '../../../domain/mounts/expansion-id';
import {
  ALL_EXPANSIONS_VALUE,
  type MountCatalogViewModel,
} from '../view-models/mount-catalog.view-model';

export class MountCatalogPresenter {
  private readonly loadMountCatalog: LoadMountCatalogUseCase;
  private readonly mounts = signal<readonly Mount[]>([]);
  private readonly status = signal<MountCatalogViewModel['status']>('idle');
  private readonly query = signal('');
  private readonly selectedExpansion = signal<ExpansionId | null>(null);

  readonly viewModel = computed<MountCatalogViewModel>(() => {
    const status = this.status();
    const items = filterMounts(this.mounts(), {
      query: this.query(),
      expansionId: this.selectedExpansion(),
    }).map((mount) => ({
      id: mount.id,
      title: mount.name,
      description: mount.description,
      imageSrc: mount.iconUrl,
      imageAlt: `Icône de la monture ${mount.name}`,
    }));

    return {
      status,
      items,
      query: this.query(),
      selectedExpansionValue: this.selectedExpansion() ?? ALL_EXPANSIONS_VALUE,
      options: EXPANSION_CATALOG,
      isEmpty: status === 'ready' && items.length === 0,
    };
  });

  constructor(loadMountCatalog: LoadMountCatalogUseCase) {
    this.loadMountCatalog = loadMountCatalog;
  }

  async load(): Promise<void> {
    if (this.status() === 'loading') {
      return;
    }

    this.status.set('loading');
    const result = await this.loadMountCatalog.execute();

    if (result.kind === 'failure') {
      this.status.set('error');
      return;
    }

    this.mounts.set(result.mounts);
    this.status.set('ready');
  }

  setQuery(value: string): void {
    this.query.set(value);
  }

  setExpansion(value: string): void {
    const expansionId = value === ALL_EXPANSIONS_VALUE ? null : parseExpansionId(value);
    this.selectedExpansion.set(expansionId);
  }
}
