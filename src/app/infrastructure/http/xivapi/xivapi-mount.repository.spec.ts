import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { AppConfig, APP_CONFIG } from '@infrastructure/config/app-config';

import { XivApiMountRepository } from './xivapi-mount.repository';

const TEST_CONFIG: AppConfig = {
  production: false,
  xivApiBaseUrl: 'https://xivapi.example.test',
};

describe('XivApiMountRepository', () => {
  it('requests the constrained public endpoint and maps its response', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        XivApiMountRepository,
        { provide: APP_CONFIG, useValue: TEST_CONFIG },
      ],
    });

    const repository = TestBed.inject(XivApiMountRepository);
    const httpController = TestBed.inject(HttpTestingController);
    const pendingMounts = repository.findAll();

    const request = httpController.expectOne((candidate) =>
      candidate.url === 'https://xivapi.example.test/mount' &&
      candidate.params.get('limit') === '3000' &&
      candidate.params.get('Columns')?.includes('Name_fr') === true,
    );

    expect(request.request.method).toBe('GET');
    request.flush({ Results: [] });
    await expect(pendingMounts).resolves.toEqual([]);
    httpController.verify();
  });
});
