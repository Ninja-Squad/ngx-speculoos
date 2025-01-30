import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent)
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
