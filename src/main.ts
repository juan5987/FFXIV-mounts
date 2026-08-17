import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

void bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => {
  console.error('Unable to bootstrap the application.', error);
});
