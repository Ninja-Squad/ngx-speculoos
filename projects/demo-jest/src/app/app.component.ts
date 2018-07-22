import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="form" (ngSubmit)="sayHello()">
      <input placeholder="Enter your first name" formControlName="firstName" id="firstName"/>
      <button [disabled]="form.invalid">Say Hello</button>
    </form>
    <div *ngIf="greeting" id="greeting">{{ greeting }}</div>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
}
