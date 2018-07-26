import {Component} from '@angular/core';

@Component({
  template: `
    <div id="classes" class="foo bar">Hello</div>
    <div id="none">Hello</div>
    <div id="noTextDiv"></div>
    <input id="name" [value]="name"/>
    <input id="checkbox" type="checkbox" [checked]="isChecked"/>
    <textarea>Hi</textarea>
    <select id="selectBox">
      <option value=""></option>
      <option value="a" selected>A</option>
      <option value="b">B</option>
    </select>
  `
})
export class TestComponent {
  name = 'Hello';
  isChecked = true;
}
