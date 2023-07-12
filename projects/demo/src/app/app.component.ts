import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf]
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  greeting = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]]
    });
  }

  sayHello(): void {
    this.greeting = `Hello ${this.form.value.firstName}`;
  }
}
