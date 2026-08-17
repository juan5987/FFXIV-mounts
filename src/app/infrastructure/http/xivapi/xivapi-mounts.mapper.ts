import type { Mount } from '@domain/mounts/mount.model';
import { parseExpansionId } from '@domain/mounts/expansion-id';
import type { AppEnvironment } from '@infrastructure/config/app-config';

import { resolveTrustedImageUrl } from './trusted-image-url';

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readNonEmptyString(record: JsonRecord, key: string): string | null {
  const value = record[key];
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

function readExpansionId(record: JsonRecord) {
  const gamePatch = record['GamePatch'];
  return isRecord(gamePatch) ? parseExpansionId(readNonEmptyString(gamePatch, 'ExName')) : null;
}

function mapMount(value: unknown, environment: AppEnvironment): Mount | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = value['ID'];
  const name = readNonEmptyString(value, 'Name_fr');
  const description = readNonEmptyString(value, 'Description_fr');
  const iconPath = readNonEmptyString(value, 'Icon');

  if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0 || !name || !description || !iconPath) {
    return null;
  }

  const iconUrl = resolveTrustedImageUrl(
    iconPath,
    environment.xivApi.baseUrl,
    environment.xivApi.allowedImageOrigins,
  );

  if (!iconUrl) {
    return null;
  }

  return {
    id,
    name,
    description,
    iconUrl,
    expansionId: readExpansionId(value),
  };
}

export function mapXivApiMountsResponse(
  response: unknown,
  environment: AppEnvironment,
): readonly Mount[] {
  if (!isRecord(response) || !Array.isArray(response['Results'])) {
    throw new Error('The mount catalog response has an invalid shape.');
  }

  return response['Results']
    .map((result) => mapMount(result, environment))
    .filter((mount): mount is Mount => mount !== null);
}
