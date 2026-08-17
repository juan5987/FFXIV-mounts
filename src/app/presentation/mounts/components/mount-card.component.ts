import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { MountCardViewModel } from '../view-models/mount-catalog.view-model';

@Component({
  selector: 'app-mount-card',
  templateUrl: './mount-card.component.html',
  styleUrl: './mount-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MountCardComponent {
  readonly item = input.required<MountCardViewModel>();
}
