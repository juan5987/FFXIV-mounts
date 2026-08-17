import { InjectionToken } from '@angular/core';

export interface AppEnvironment {
  readonly production: boolean;
  readonly xivApi: {
    readonly baseUrl: string;
    readonly allowedImageOrigins: readonly string[];
  };
}

export const APP_CONFIG = new InjectionToken<AppEnvironment>('APP_CONFIG');
