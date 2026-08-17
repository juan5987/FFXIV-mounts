import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Mount } from '../domain/mount.model';

export interface MountsGateway {
  listMounts(): Observable<readonly Mount[]>;
}

export const MOUNTS_GATEWAY = new InjectionToken<MountsGateway>('MOUNTS_GATEWAY');
