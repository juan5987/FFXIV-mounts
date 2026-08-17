import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('renders the bootstrap state', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Initialisation du catalogue');
  });
});
