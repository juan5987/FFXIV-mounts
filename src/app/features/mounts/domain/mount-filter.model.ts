import { ExpansionId } from './mount.model';

export interface MountFilter {
  readonly query: string;
  readonly expansionId: ExpansionId | null;
}
