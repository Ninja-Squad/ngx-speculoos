import { Component, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ReactiveFormsModule]
})
export class AppComponent {
  form = inject(NonNullableFormBuilder).group({
    firstName: ['', [Validators.required]]
  });
  greeting = signal('');

  sayHello(): void {
    this.greeting.set(`Hello ${this.form.value.firstName}`);
  }
}
