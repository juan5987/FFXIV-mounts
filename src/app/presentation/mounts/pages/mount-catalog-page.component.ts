import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { MountCatalogFacade } from '@application/mounts/mount-catalog.facade';
import { ExpansionId } from '@domain/mounts/mount.model';

import { MountCardComponent } from '../components/mount-card.component';

@Component({
  selector: 'app-mount-catalog-page',
  imports: [MountCardComponent],
  templateUrl: './mount-catalog-page.component.html',
  styleUrl: './mount-catalog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MountCatalogPageComponent implements OnInit {
  readonly facade = inject(MountCatalogFacade);

  ngOnInit(): void {
    void this.facade.load();
  }

  onExpansionChange(value: string): void {
    this.facade.setExpansion(value === 'all' ? null : value as ExpansionId);
  }
}
