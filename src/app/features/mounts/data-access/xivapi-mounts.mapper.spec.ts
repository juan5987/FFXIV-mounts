import { describe, expect, it } from 'vitest';

import { mapXivApiMountsResponse } from './xivapi-mounts.mapper';

describe('mapXivApiMountsResponse', () => {
  const apiBaseUrl = 'https://xivapi.com';

  it('normalizes valid API records and drops incomplete records', () => {
    const mounts = mapXivApiMountsResponse(
      {
        Results: [
          {
            ID: 1,
            Name_fr: 'Chocobo destrier',
            Description_fr: 'Une monture de compagnie.',
            Icon: '/i/068000/068001.png',
            GamePatch: { ExName: 'A Realm Reborn' },
          },
          {
            ID: 2,
            Name_fr: 'Monture incomplète',
            Description_fr: '',
            Icon: '/i/068000/068002.png',
          },
        ],
      },
      apiBaseUrl,
    );

    expect(mounts).toEqual([
      {
        id: 1,
        name: 'Chocobo destrier',
        description: 'Une monture de compagnie.',
        iconUrl: 'https://xivapi.com/i/068000/068001.png',
        expansionId: 'A Realm Reborn',
      },
    ]);
  });

  it('fails closed when the response envelope is invalid', () => {
    expect(() => mapXivApiMountsResponse({ results: [] }, apiBaseUrl)).toThrow(
      'The mount catalog response has an invalid shape.',
    );
  });
});
