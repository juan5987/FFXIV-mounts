import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

import type { Mount } from '@domain/mounts/mount.model';
import { MountRepository } from '@domain/mounts/mount.repository';
import { APP_CONFIG } from '@infrastructure/config/app-config';

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
export class XivApiMountRepository extends MountRepository {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  findAll(): Promise<readonly Mount[]> {
    const params = new HttpParams()
      .set('limit', '3000')
      .set('Columns', MOUNTS_COLUMNS);

    return firstValueFrom(
      this.http
        .get<unknown>(`${this.config.xivApi.baseUrl}/mount`, { params })
        .pipe(map((response) => mapXivApiMountsResponse(response, this.config))),
    );
  }
}
