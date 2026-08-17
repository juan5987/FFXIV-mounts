import { MountFilter } from './mount-filter.model';
import { Mount } from './mount.model';

export function filterMounts(
  mounts: readonly Mount[],
  filter: MountFilter,
): readonly Mount[] {
  const normalizedQuery = filter.query.toLocaleLowerCase('fr-FR');

  return mounts.filter((mount) => {
    const matchesQuery = mount.name.toLocaleLowerCase('fr-FR').includes(normalizedQuery);
    const matchesExpansion =
      filter.expansionId === null || mount.expansionId === filter.expansionId;

    return matchesQuery && matchesExpansion;
  });
}
