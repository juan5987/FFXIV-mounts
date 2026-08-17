import { Injectable, computed, inject, signal } from '@angular/core';

import { EXPANSION_OPTIONS, ExpansionOption } from '@domain/mounts/expansion-options';
import { filterMounts } from '@domain/mounts/filter-mounts';
import { MountFilter } from '@domain/mounts/mount-filter.model';
import { ExpansionId, Mount } from '@domain/mounts/mount.model';
import { MountRepository } from '@domain/mounts/mount.repository';

export type MountCatalogStatus = 'idle' | 'loading' | 'success' | 'error';

export interface MountCatalogState {
  readonly mounts: readonly Mount[];
  readonly filter: MountFilter;
  readonly status: MountCatalogStatus;
  readonly error: 'load-failed' | null;
}

const INITIAL_STATE: MountCatalogState = {
  mounts: [],
  filter: {
    query: '',
    expansionId: null,
  },
  status: 'idle',
  error: null,
};

@Injectable()
export class MountCatalogFacade {
  private readonly repository = inject(MountRepository);
  private readonly stateSignal = signal<MountCatalogState>(INITIAL_STATE);

  readonly state = this.stateSignal.asReadonly();
  readonly expansionOptions = signal<readonly ExpansionOption[]>(EXPANSION_OPTIONS).asReadonly();
  readonly filteredMounts = computed(() => {
    const { mounts, filter } = this.stateSignal();
    return filterMounts(mounts, filter);
  });

  async load(): Promise<void> {
    if (this.stateSignal().status === 'loading') {
      return;
    }

    this.stateSignal.update((state) => ({
      ...state,
      status: 'loading',
      error: null,
    }));

    try {
      const mounts = await this.repository.findAll();
      this.stateSignal.update((state) => ({
        ...state,
        mounts,
        status: 'success',
      }));
    } catch {
      this.stateSignal.update((state) => ({
        ...state,
        status: 'error',
        error: 'load-failed',
      }));
    }
  }

  retry(): Promise<void> {
    return this.load();
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
