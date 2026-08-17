import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { APP_CONFIG, AppConfig } from '../../../core/config/app-config';
import { XivApiMountsService } from './xivapi-mounts.service';

const TEST_CONFIG: AppConfig = {
  production: false,
  xivApiBaseUrl: 'https://xivapi.example.test',
};

describe('XivApiMountsService', () => {
  it('requests the constrained public endpoint and maps its response', () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        XivApiMountsService,
        { provide: APP_CONFIG, useValue: TEST_CONFIG },
      ],
    });

    const service = TestBed.inject(XivApiMountsService);
    const httpController = TestBed.inject(HttpTestingController);
    let resultCount = 0;

    service.listMounts().subscribe((mounts) => {
      resultCount = mounts.length;
    });

    const request = httpController.expectOne((candidate) =>
      candidate.url === 'https://xivapi.example.test/mount' &&
      candidate.params.get('limit') === '3000' &&
      candidate.params.get('Columns')?.includes('Name_fr') === true,
    );

    expect(request.request.method).toBe('GET');
    request.flush({ Results: [] });
    expect(resultCount).toBe(0);
    httpController.verify();
  });
});
