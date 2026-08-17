import type { ExpansionId } from './expansion-id';

export interface MountFilter {
  readonly query: string;
  readonly expansionId: ExpansionId | null;
}
