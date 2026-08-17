import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { ExpansionId } from '../domain/mount.model';
import { MountCatalogStore } from '../state/mount-catalog.store';
import { MountCardComponent } from '../ui/mount-card.component';

@Component({
  selector: 'app-mount-catalog-page',
  imports: [MountCardComponent],
  templateUrl: './mount-catalog-page.component.html',
  styleUrl: './mount-catalog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MountCatalogPageComponent implements OnInit {
  readonly store = inject(MountCatalogStore);

  ngOnInit(): void {
    this.store.load();
  }

  onExpansionChange(value: string): void {
    this.store.setExpansion(value === 'all' ? null : value as ExpansionId);
  }
}
