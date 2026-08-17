import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { MountCatalogPresenter } from '../presenters/mount-catalog.presenter';

import { MountCardComponent } from '../components/mount-card.component';

@Component({
  selector: 'app-mount-catalog-page',
  imports: [MountCardComponent],
  templateUrl: './mount-catalog-page.component.html',
  styleUrl: './mount-catalog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MountCatalogPageComponent implements OnInit {
  private readonly presenter = inject(MountCatalogPresenter);

  readonly viewModel = this.presenter.viewModel;

  ngOnInit(): void {
    void this.presenter.load();
  }

  onQueryChange(query: string): void {
    this.presenter.setQuery(query);
  }

  onExpansionChange(value: string): void {
    this.presenter.setExpansion(value);
  }

  onRetry(): void {
    void this.presenter.load();
  }
}
