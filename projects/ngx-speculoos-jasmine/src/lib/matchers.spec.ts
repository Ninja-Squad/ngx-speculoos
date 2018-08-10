import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ComponentTester } from 'ngx-speculoos';
import { speculoosMatchers } from './matchers';

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
class TestComponent {
  name = 'Hello';
  isChecked = true;
}

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get div() {
    return this.element('#classes');
  }

  get none() {
    return this.element('#none');
  }

  get noTextDiv() {
    return this.element('#noTextDiv');
  }

  get name() {
    return this.input('#name');
  }

  get checkbox() {
    return this.input('#checkbox');
  }

  get textArea() {
    return this.textarea('textarea');
  }

  get selectBox() {
    return this.select('#selectBox');
  }
}

describe('Custom matchers', () => {

  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TestComponent] });
    tester = new TestComponentTester();
    tester.detectChanges();
    jasmine.addMatchers(speculoosMatchers);
  });

  describe('toHaveClass', () => {
    const matcher = speculoosMatchers.toHaveClass(undefined, undefined);

    it('should check for a class', () => {
      expect(tester.div).toHaveClass('foo');
      expect(tester.div).not.toHaveClass('baz');
    });

    it('should return false if class is missing', () => {
      const result = matcher.compare(tester.div, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have class 'baz', but had 'foo, bar'`);
    });
  });

  describe('toHaveValue', () => {
    it('should check for a value on an input', () => {
      expect(tester.name).toHaveValue('Hello');
      expect(tester.name).not.toHaveValue('baz');
    });
  });

  describe('toHaveText', () => {
    it('should check for a textContent', () => {
      expect(tester.div).toHaveText('Hello');
      expect(tester.div).not.toHaveText('He');
    });
  });

  describe('toContainText', () => {
    it('should check for a textContent', () => {
      expect(tester.div).toContainText('He');
      expect(tester.div).not.toContainText('baz');
    });
  });

  describe('toBeChecked', () => {
    it('should check if checked', () => {
      expect(tester.checkbox).toBeChecked();
      tester.checkbox.uncheck();
      expect(tester.checkbox).not.toBeChecked();
    });
  });

  describe('toHaveSelectedIndex', () => {
    it('should check selected index on a select', () => {
      expect(tester.selectBox).toHaveSelectedIndex(1);
      expect(tester.selectBox).not.toHaveSelectedIndex(0);
    });
  });

  describe('toHaveSelectedValue', () => {
    it('should check selected value on a select', () => {
      expect(tester.selectBox).toHaveSelectedValue('a');
      expect(tester.selectBox).not.toHaveSelectedValue('b');
    });
  });

  describe('toHaveSelectedLabel', () => {
    it('should check selected label on a select', () => {
      expect(tester.selectBox).toHaveSelectedLabel('A');
      expect(tester.selectBox).not.toHaveSelectedLabel('B');
    });
  });
});
