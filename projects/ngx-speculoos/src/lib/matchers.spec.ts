import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ComponentTester } from './component-tester';
import { speculoosMatchers } from './matchers';

@Component({
  template: `
    <div id="classes" class="foo bar">Hello</div>
    <div id="none">Hello</div>
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

    it('should return true if class is missing and .not', () => {
      const result = matcher.negativeCompare(tester.div, 'foo');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have class 'foo', but had 'foo, bar'`);
    });

    it('should return false if no class', () => {
      const result = matcher.compare(tester.none, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have class 'baz', but had none`);
    });

    it('should return true if class is no class and .not', () => {
      const result = matcher.negativeCompare(tester.none, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if no element', () => {
      const result = matcher.compare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = matcher.negativeCompare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = matcher.compare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was not a TestElement`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = matcher.negativeCompare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was not a TestElement`);
    });

  });

  describe('toHaveValue', () => {
    const matcher = speculoosMatchers.toHaveValue(undefined, undefined);

    it('should check for a value on an input', () => {
      expect(tester.name).toHaveValue('Hello');
      expect(tester.name).not.toHaveValue('baz');
    });

    it('should check for a value on a textArea', () => {
      // works with TestTextArea
      expect(tester.textArea).toHaveValue('Hi');
    });

    it('should return false if wrong value', () => {
      const result = matcher.compare(tester.name, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have value 'baz', but had value 'Hello'`);
    });

    it('should return true if wrong value and .not', () => {
      const result = matcher.negativeCompare(tester.name, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if no element', () => {
      const result = matcher.compare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = matcher.negativeCompare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = matcher.compare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was neither a TestInput nor a TestTextArea`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = matcher.negativeCompare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was neither a TestInput nor a TestTextArea`);
    });

  });

  describe('toHaveText', () => {
    const matcher = speculoosMatchers.toHaveText(undefined, undefined);

    it('should check for a textContent', () => {
      expect(tester.div).toHaveText('Hello');
      expect(tester.div).not.toHaveText('He');
      expect(tester.div).not.toHaveText('baz');
    });

    it('should return false if wrong textContent', () => {
      const result = matcher.compare(tester.div, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have textContent 'baz', but had textContent 'Hello'`);
    });

    it('should return true if wrong textContent and .not', () => {
      const result = matcher.negativeCompare(tester.div, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if no textContent', () => {
      const result = matcher.compare(tester.name, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have textContent 'baz', but had no textContent`);
    });

    it('should return true if no textContent and .not', () => {
      const result = matcher.negativeCompare(tester.name, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if no element', () => {
      const result = matcher.compare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check textContent 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = matcher.negativeCompare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check textContent 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = matcher.compare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check textContent 'baz' on element, but element was not a TestElement`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = matcher.negativeCompare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check textContent 'baz' on element, but element was not a TestElement`);
    });

  });

  describe('toContainText', () => {
    const matcher = speculoosMatchers.toContainText(undefined, undefined);

    it('should check for a textContent', () => {
      expect(tester.div).toContainText('Hello');
      expect(tester.div).toContainText('He');
      expect(tester.div).not.toContainText('baz');
    });

    it('should return false if wrong textContent', () => {
      const result = matcher.compare(tester.div, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to contain textContent 'baz', but had textContent 'Hello'`);
    });

    it('should return true if wrong textContent and .not', () => {
      const result = matcher.negativeCompare(tester.div, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if no textContent', () => {
      const result = matcher.compare(tester.name, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to contain textContent 'baz', but had no textContent`);
    });

    it('should return true if no textContent and .not', () => {
      const result = matcher.negativeCompare(tester.name, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if no element', () => {
      const result = matcher.compare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check textContent 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = matcher.negativeCompare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check textContent 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = matcher.compare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check textContent 'baz' on element, but element was not a TestElement`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = matcher.negativeCompare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check textContent 'baz' on element, but element was not a TestElement`);
    });

  });

  describe('toBeChecked', () => {
    const matcher = speculoosMatchers.toBeChecked(undefined, undefined);

    it('should check if checked', () => {
      expect(tester.checkbox).toBeChecked();
      tester.checkbox.uncheck();
      expect(tester.checkbox).not.toBeChecked();
    });

    it('should return false if not checked', () => {
      tester.checkbox.uncheck();
      const result = matcher.compare(tester.checkbox);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to be checked, but was not`);
    });

    it('should return true if not checked and .not', () => {
      tester.checkbox.uncheck();
      const result = matcher.negativeCompare(tester.checkbox);
      expect(result.pass).toBeTruthy();
    });

    it('should return false if checked and .not', () => {
      const result = matcher.negativeCompare(tester.checkbox);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to be not checked, but was`);
    });

    it('should return false if no element', () => {
      const result = matcher.compare(null);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check if element was checked, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = matcher.negativeCompare(null);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check if element was checked, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = matcher.compare('hello');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check if element was checked, but element was not a TestInput`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = matcher.negativeCompare('hello');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check if element was checked, but element was not a TestInput`);
    });

  });

  describe('toHaveSelectedIndex', () => {
    const matcher = speculoosMatchers.toHaveSelectedIndex(undefined, undefined);

    it('should check selected index on a select', () => {
      expect(tester.selectBox).toHaveSelectedIndex(1);
      expect(tester.selectBox).not.toHaveSelectedIndex(0);
    });

    it('should return false if wrong value', () => {
      const result = matcher.compare(tester.selectBox, 0);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have selected index 0, but had 1`);
    });

    it('should return true if wrong value and .not', () => {
      const result = matcher.negativeCompare(tester.selectBox, 0);
      expect(result.pass).toBeTruthy();
    });

    it('should return false if matching value and .not', () => {
      const result = matcher.negativeCompare(tester.selectBox, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have selected index 1, but had 1`);
    });

    it('should return false if no element', () => {
      const result = matcher.compare(null, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected index 1 on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = matcher.negativeCompare(null, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected index 1 on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = matcher.compare(tester.textArea, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected index 1 on element, but element was not a TestSelect`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = matcher.negativeCompare(tester.textArea, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected index 1 on element, but element was not a TestSelect`);
    });
  });

  describe('toHaveSelectedValue', () => {
    const matcher = speculoosMatchers.toHaveSelectedValue(undefined, undefined);

    it('should check selected value on a select', () => {
      expect(tester.selectBox).toHaveSelectedValue('a');
      expect(tester.selectBox).not.toHaveSelectedValue('b');
    });

    it('should return false if wrong value', () => {
      const result = matcher.compare(tester.selectBox, 'b');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have selected value 'b', but had 'a'`);
    });

    it('should return true if wrong value and .not', () => {
      const result = matcher.negativeCompare(tester.selectBox, 'b');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if matching value and .not', () => {
      const result = matcher.negativeCompare(tester.selectBox, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have selected value 'a', but had 'a'`);
    });

    it('should return false if no element', () => {
      const result = matcher.compare(null, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected value 'a' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = matcher.negativeCompare(null, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected value 'a' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = matcher.compare(tester.textArea, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected value 'a' on element, but element was not a TestSelect`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = matcher.negativeCompare(tester.textArea, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected value 'a' on element, but element was not a TestSelect`);
    });
  });

  describe('toHaveSelectedLabel', () => {
    const matcher = speculoosMatchers.toHaveSelectedLabel(undefined, undefined);

    it('should check selected label on a select', () => {
      expect(tester.selectBox).toHaveSelectedLabel('A');
      expect(tester.selectBox).not.toHaveSelectedLabel('B');
    });

    it('should return false if wrong label', () => {
      const result = matcher.compare(tester.selectBox, 'B');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have selected label 'B', but had 'A'`);
    });

    it('should return true if wrong label and .not', () => {
      const result = matcher.negativeCompare(tester.selectBox, 'b');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if matching label and .not', () => {
      const result = matcher.negativeCompare(tester.selectBox, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have selected label 'A', but had 'A'`);
    });

    it('should return false if no element', () => {
      const result = matcher.compare(null, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected label 'A' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = matcher.negativeCompare(null, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected label 'A' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = matcher.compare(tester.textArea, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected label 'A' on element, but element was not a TestSelect`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = matcher.negativeCompare(tester.textArea, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected label 'A' on element, but element was not a TestSelect`);
    });
  });
});
