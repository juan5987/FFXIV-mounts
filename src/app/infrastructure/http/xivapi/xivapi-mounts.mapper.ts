import { Mount } from '@domain/mounts/mount.model';

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readNonEmptyString(record: JsonRecord, key: string): string | null {
  const value = record[key];
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

function readExpansionId(record: JsonRecord): string | null {
  const gamePatch = record['GamePatch'];
  return isRecord(gamePatch) ? readNonEmptyString(gamePatch, 'ExName') : null;
}

function mapMount(value: unknown, apiBaseUrl: string): Mount | null {
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

  try {
    return {
      id,
      name,
      description,
      iconUrl: new URL(iconPath, apiBaseUrl).toString(),
      expansionId: readExpansionId(value),
    };
  } catch {
    return null;
  }
}

export function mapXivApiMountsResponse(response: unknown, apiBaseUrl: string): readonly Mount[] {
  if (!isRecord(response) || !Array.isArray(response['Results'])) {
    throw new Error('The mount catalog response has an invalid shape.');
  }

  return response['Results']
    .map((result) => mapMount(result, apiBaseUrl))
    .filter((mount): mount is Mount => mount !== null);
}
