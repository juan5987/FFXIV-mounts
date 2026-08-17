import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { MountCatalogFacade } from '@application/mounts/mount-catalog.facade';
import { isExpansionId } from '@domain/mounts/expansion-options';

import { MountCardComponent } from '../components/mount-card.component';

@Component({
  selector: 'app-mount-catalog-page',
  imports: [MountCardComponent],
  templateUrl: './mount-catalog-page.component.html',
  styleUrl: './mount-catalog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MountCatalogPageComponent implements OnInit {
  private readonly facade = inject(MountCatalogFacade);

  readonly state = this.facade.state;
  readonly mounts = this.facade.filteredMounts;
  readonly expansionOptions = this.facade.expansionOptions;

  ngOnInit(): void {
    void this.facade.load();
  }

  onQueryChange(query: string): void {
    this.facade.setQuery(query);
  }

  onExpansionChange(value: string): void {
    if (value === 'all') {
      this.facade.setExpansion(null);
      return;
    }

    if (isExpansionId(value)) {
      this.facade.setExpansion(value);
    }
  }

  onRetry(): void {
    void this.facade.retry();
  }
}
