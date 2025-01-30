import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly form = inject(NonNullableFormBuilder).group({
    firstName: ['', [Validators.required]]
  });
  readonly greeting = signal('');

  sayHello(): void {
    this.greeting.set(`Hello ${this.form.value.firstName}`);
  }
}
