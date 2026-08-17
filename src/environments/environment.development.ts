import type { AppEnvironment } from '@infrastructure/config/app-config';

export const environment: AppEnvironment = {
  production: false,
  xivApi: {
    baseUrl: 'https://xivapi.com',
    allowedImageOrigins: ['https://xivapi.com'],
  },
};
