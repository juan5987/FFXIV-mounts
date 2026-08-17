export enum ExpansionId {
  ARealmReborn = 'A Realm Reborn',
  Heavensward = 'Heavensward',
  Stormblood = 'Stormblood',
  Shadowbringers = 'Shadowbringers',
  Endwalker = 'Endwalker',
}

export function parseExpansionId(value: unknown): ExpansionId | null {
  if (typeof value !== 'string') {
    return null;
  }

  return Object.values(ExpansionId).find((id) => id === value) ?? null;
}

export function serializeExpansionId(value: ExpansionId): string {
  return value;
}
