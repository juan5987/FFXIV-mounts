import { ExpansionId } from './expansion-id';
import type { ExpansionOption } from './expansion-option.model';

export const EXPANSION_CATALOG: readonly ExpansionOption[] = [
  { id: ExpansionId.ARealmReborn, label: 'A Realm Reborn' },
  { id: ExpansionId.Heavensward, label: 'Heavensward' },
  { id: ExpansionId.Stormblood, label: 'Stormblood' },
  { id: ExpansionId.Shadowbringers, label: 'Shadowbringers' },
  { id: ExpansionId.Endwalker, label: 'Endwalker' },
];
