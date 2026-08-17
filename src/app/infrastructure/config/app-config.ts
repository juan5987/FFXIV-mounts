import { InjectionToken } from '@angular/core';

export interface AppConfig {
  readonly production: boolean;
  readonly xivApiBaseUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
