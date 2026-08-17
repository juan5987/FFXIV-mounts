import { describe, expect, it } from 'vitest';

import { createInitialMountCatalogState } from './mount-catalog-state.model';

describe('createInitialMountCatalogState', () => {
  it('creates an idle catalog state with empty filters and no error', () => {
    expect(createInitialMountCatalogState()).toEqual({
      mounts: [],
      filter: {
        query: '',
        expansionId: null,
      },
      status: 'idle',
      error: null,
    });
  });

  it('creates distinct nested state references for each catalog instance', () => {
    const firstState = createInitialMountCatalogState();
    const secondState = createInitialMountCatalogState();

    expect(firstState).not.toBe(secondState);
    expect(firstState.mounts).not.toBe(secondState.mounts);
    expect(firstState.filter).not.toBe(secondState.filter);
  });
});
