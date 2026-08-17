import { ExpansionId } from './mount.model';

export interface ExpansionOption {
  readonly value: ExpansionId;
  readonly label: string;
}

export const EXPANSION_OPTIONS: readonly ExpansionOption[] = [
  { value: 'A Realm Reborn', label: 'A Realm Reborn' },
  { value: 'Heavensward', label: 'Heavensward' },
  { value: 'Stormblood', label: 'Stormblood' },
  { value: 'Shadowbringers', label: 'Shadowbringers' },
  { value: 'Endwalker', label: 'Endwalker' },
];
