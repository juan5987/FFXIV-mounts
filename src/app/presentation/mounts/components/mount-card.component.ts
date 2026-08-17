import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Mount } from '@domain/mounts/mount.model';

@Component({
  selector: 'app-mount-card',
  templateUrl: './mount-card.component.html',
  styleUrl: './mount-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MountCardComponent {
  readonly mount = input.required<Mount>();
}
