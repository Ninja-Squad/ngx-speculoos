import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
