import type { AppEnvironment } from '@infrastructure/config/app-config';

export const environment: AppEnvironment = {
  production: true,
  xivApi: {
    baseUrl: 'https://xivapi.com',
    allowedImageOrigins: ['https://xivapi.com'],
  },
};
