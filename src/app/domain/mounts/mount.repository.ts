import { Mount } from './mount.model';

export abstract class MountRepository {
  abstract findAll(): Promise<readonly Mount[]>;
}
