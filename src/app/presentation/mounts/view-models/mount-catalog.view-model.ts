import type { ExpansionOption } from '../../../domain/mounts/expansion-option.model';

export const ALL_EXPANSIONS_VALUE = '';

export type CatalogViewStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface MountCardViewModel {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

export interface MountCatalogViewModel {
  readonly status: CatalogViewStatus;
  readonly items: readonly MountCardViewModel[];
  readonly query: string;
  readonly selectedExpansionValue: string;
  readonly options: readonly ExpansionOption[];
  readonly isEmpty: boolean;
}
