import { describe, expect, it } from 'vitest';

import { filterMounts } from './filter-mounts';
import { ExpansionId } from './expansion-id';
import { Mount } from './mount.model';

const MOUNTS: readonly Mount[] = [
  {
    id: 1,
    name: 'Chocobo destrier',
    description: 'Une monture de compagnie.',
    iconUrl: 'https://example.test/chocobo.png',
    expansionId: ExpansionId.ARealmReborn,
  },
  {
    id: 2,
    name: 'Faucon flamboyant',
    description: 'Une monture ailée.',
    iconUrl: 'https://example.test/faucon.png',
    expansionId: ExpansionId.Heavensward,
  },
];

describe('filterMounts', () => {
  it('combines a case-insensitive name search and an expansion filter without mutating input', () => {
    const result = filterMounts(MOUNTS, {
      query: 'FAUCON',
      expansionId: ExpansionId.Heavensward,
    });

    expect(result).toEqual([MOUNTS[1]]);
    expect(MOUNTS).toHaveLength(2);
  });

  it('preserves API order when no filter is active', () => {
    expect(filterMounts(MOUNTS, { query: '', expansionId: null })).toEqual(MOUNTS);
  });
});
