import type { MountRepository } from '../../domain/mounts/mount.repository';
import type { LoadMountCatalogResult } from './load-mount-catalog.result';

export class LoadMountCatalogUseCase {
  constructor(private readonly mountRepository: MountRepository) {}

  async execute(): Promise<LoadMountCatalogResult> {
    try {
      return { kind: 'success', mounts: await this.mountRepository.findAll() };
    } catch {
      return { kind: 'failure', reason: 'unavailable' };
    }
  }
}
