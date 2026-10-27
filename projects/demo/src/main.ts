import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent)
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
