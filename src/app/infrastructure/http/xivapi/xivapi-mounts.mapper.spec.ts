import { describe, expect, it } from 'vitest';

import { mapXivApiMountsResponse } from './xivapi-mounts.mapper';

const environment = {
  production: false,
  xivApi: {
    baseUrl: 'https://xivapi.com',
    allowedImageOrigins: ['https://xivapi.com'],
  },
};

describe('mapXivApiMountsResponse', () => {
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
      environment,
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
    expect(() => mapXivApiMountsResponse({ results: [] }, environment)).toThrow(
      'The mount catalog response has an invalid shape.',
    );
  });

  it('drops records with an untrusted icon URL', () => {
    const mounts = mapXivApiMountsResponse(
      {
        Results: [
          {
            ID: 1,
            Name_fr: 'Chocobo destrier',
            Description_fr: 'Une monture de compagnie.',
            Icon: 'https://untrusted.example.test/mount.png',
          },
        ],
      },
      environment,
    );

    expect(mounts).toEqual([]);
  });
});
