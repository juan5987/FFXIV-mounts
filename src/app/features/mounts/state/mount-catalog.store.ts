import { Injectable, computed, inject, signal } from '@angular/core';
import { take } from 'rxjs';

import { EXPANSION_OPTIONS, ExpansionOption } from '../domain/expansion-options';
import { MountFilter } from '../domain/mount-filter.model';
import { ExpansionId, Mount } from '../domain/mount.model';
import { MOUNTS_GATEWAY } from '../data-access/mounts.gateway';

export type MountCatalogStatus = 'idle' | 'loading' | 'success' | 'error';

export interface MountCatalogState {
  readonly mounts: readonly Mount[];
  readonly filter: MountFilter;
  readonly status: MountCatalogStatus;
  readonly errorMessage: string | null;
}

const INITIAL_STATE: MountCatalogState = {
  mounts: [],
  filter: {
    query: '',
    expansionId: null,
  },
  status: 'idle',
  errorMessage: null,
};

@Injectable()
export class MountCatalogStore {
  private readonly gateway = inject(MOUNTS_GATEWAY);
  private readonly stateSignal = signal<MountCatalogState>(INITIAL_STATE);

  readonly state = this.stateSignal.asReadonly();
  readonly expansionOptions = signal<readonly ExpansionOption[]>(EXPANSION_OPTIONS).asReadonly();
  readonly filteredMounts = computed(() => {
    const { filter, mounts } = this.stateSignal();
    const normalizedQuery = filter.query.toLocaleLowerCase('fr-FR');

    return mounts.filter((mount) => {
      const matchesQuery = mount.name.toLocaleLowerCase('fr-FR').includes(normalizedQuery);
      const matchesExpansion =
        filter.expansionId === null || mount.expansionId === filter.expansionId;

      return matchesQuery && matchesExpansion;
    });
  });

  load(): void {
    if (this.stateSignal().status === 'loading') {
      return;
    }

    this.stateSignal.update((state) => ({
      ...state,
      status: 'loading',
      errorMessage: null,
    }));

    this.gateway
      .listMounts()
      .pipe(take(1))
      .subscribe({
        next: (mounts) => {
          this.stateSignal.update((state) => ({
            ...state,
            mounts,
            status: 'success',
          }));
        },
        error: () => {
          this.stateSignal.update((state) => ({
            ...state,
            status: 'error',
            errorMessage: 'Le catalogue est indisponible pour le moment.',
          }));
        },
      });
  }

  retry(): void {
    this.load();
  }

  setQuery(query: string): void {
    this.updateFilter({ query });
  }

  setExpansion(expansionId: ExpansionId | null): void {
    this.updateFilter({ expansionId });
  }

  private updateFilter(filter: Partial<MountFilter>): void {
    this.stateSignal.update((state) => ({
      ...state,
      filter: {
        ...state.filter,
        ...filter,
      },
    }));
  }
}
