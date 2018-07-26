import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
export class AppComponent implements OnInit {
  form: FormGroup;
  greeting = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]]
    });
  }

  sayHello() {
    this.greeting = `Hello ${this.form.value.firstName}`;
  }
}
