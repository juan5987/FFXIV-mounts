import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { APP_CONFIG } from '../../../core/config/app-config';
import { Mount } from '../domain/mount.model';
import { MountsGateway } from './mounts.gateway';
import { mapXivApiMountsResponse } from './xivapi-mounts.mapper';

const MOUNTS_COLUMNS = [
  'ID',
  'Name_fr',
  'Description_fr',
  'GamePatch.ExName',
  'GamePatch.Version',
  'Icon',
].join(',');

@Injectable()
export class XivApiMountsService implements MountsGateway {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  listMounts(): Observable<readonly Mount[]> {
    const params = new HttpParams()
      .set('limit', '3000')
      .set('Columns', MOUNTS_COLUMNS);

    return this.http
      .get<unknown>(`${this.config.xivApiBaseUrl}/mount`, { params })
      .pipe(map((response) => mapXivApiMountsResponse(response, this.config.xivApiBaseUrl)));
  }
}
