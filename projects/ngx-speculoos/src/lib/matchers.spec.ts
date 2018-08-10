import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ComponentTester } from './component-tester';
import {
  toBeChecked,
  toContainText,
  toHaveClass,
  toHaveSelectedIndex,
  toHaveSelectedLabel,
  toHaveSelectedValue,
  toHaveText,
  toHaveValue
} from './matchers';

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
  });

  describe('toHaveClass', () => {
    it('should check for a class', () => {
      expect(toHaveClass(false, tester.div, 'foo').pass).toBe(true);
      expect(toHaveClass(true, tester.div, 'baz').pass).toBe(true);
    });

    it('should return false if class is missing', () => {
      const result = toHaveClass(false, tester.div, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have class 'baz', but had 'foo, bar'`);
    });

    it('should return false if class is present and .not', () => {
      const result = toHaveClass(true, tester.div, 'foo');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have class 'foo', but had 'foo, bar'`);
    });

    it('should return false if no class', () => {
      const result = toHaveClass(false, tester.none, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have class 'baz', but had none`);
    });

    it('should return true if class is absent and .not', () => {
      const result = toHaveClass(true, tester.none, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if no element', () => {
      const result = toHaveClass(false, null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = toHaveClass(false, null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = toHaveClass(false, 'hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was not a TestElement`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = toHaveClass(true, 'hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was not a TestElement`);
    });
  });

  describe('toHaveValue', () => {
    it('should check for a value on an input', () => {
      expect(toHaveValue(false, tester.name, 'Hello').pass).toBe(true);
      expect(toHaveValue(true, tester.name, 'baz').pass).toBe(true);
    });

    it('should check for a value on a textArea', () => {
      // works with TestTextArea
      expect(toHaveValue(false, tester.textArea, 'Hi').pass).toBe(true);
    });

    it('should return false if wrong value', () => {
      const result = toHaveValue(false, tester.name, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have value 'baz', but had value 'Hello'`);
    });

    it('should return true if wrong value and .not', () => {
      const result = toHaveValue(true, tester.name, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if matching value and .not', () => {
      const result = toHaveValue(true, tester.name, 'Hello');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have value 'Hello', but had value 'Hello'`);
    });

    it('should return false if no element', () => {
      const result = toHaveValue(false, null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = toHaveValue(true, null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = toHaveValue(false, 'hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was neither a TestInput nor a TestTextArea`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = toHaveValue(true, 'hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was neither a TestInput nor a TestTextArea`);
    });

  });

  describe('toHaveText', () => {
    it('should check for a textContent', () => {
      expect(toHaveText(false, tester.div, 'Hello').pass).toBe(true);
      expect(toHaveText(true, tester.div, 'He').pass).toBe(true);
      expect(toHaveText(true, tester.div, 'baz').pass).toBe(true);
    });

    it('should check for an empty textContent', () => {
      expect(toHaveText(false, tester.noTextDiv, '').pass).toBe(true);
      expect(toHaveText(true, tester.noTextDiv, 'Hello').pass).toBe(true);
    });

    it('should return false if wrong textContent', () => {
      const result = toHaveText(false, tester.div, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have text 'baz', but had 'Hello'`);
    });

    it('should return true if wrong textContent and .not', () => {
      const result = toHaveText(true, tester.div, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if matching textContent and .not', () => {
      const result = toHaveText(true, tester.div, 'Hello');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have text 'Hello', but had 'Hello'`);
    });

    it('should return false if no textContent', () => {
      const result = toHaveText(false, tester.noTextDiv, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have text 'baz', but had ''`);
    });

    it('should return true if no textContent and .not', () => {
      const result = toHaveText(true, tester.name, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if no element', () => {
      const result = toHaveText(false, null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check text 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = toHaveText(true, null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check text 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = toHaveText(false, 'hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check text 'baz' on element, but element was not a TestElement`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = toHaveText(true, 'hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check text 'baz' on element, but element was not a TestElement`);
    });

  });

  describe('toContainText', () => {
    it('should check for a textContent', () => {
      expect(toContainText(false, tester.div, 'Hello').pass).toBe(true);
      expect(toContainText(false, tester.div, 'He').pass).toBe(true);
      expect(toContainText(true, tester.div, 'baz').pass).toBe(true);
    });

    it('should return false if wrong textContent', () => {
      const result = toContainText(false, tester.div, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to contain text 'baz', but had text 'Hello'`);
    });

    it('should return true if wrong textContent and .not', () => {
      const result = toContainText(true, tester.div, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if matching textContent and .not', () => {
      const result = toContainText(true, tester.div, 'He');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not contain text 'He', but had text 'Hello'`);
    });

    it('should return false if no textContent', () => {
      const result = toContainText(false, tester.name, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to contain text 'baz', but had no text`);
    });

    it('should return true if no textContent and .not', () => {
      const result = toContainText(true, tester.name, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if no element', () => {
      const result = toContainText(false, null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check text 'baz' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = toContainText(true, null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check text 'baz' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = toContainText(false, 'hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check text 'baz' on element, but element was not a TestElement`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = toContainText(true, 'hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check text 'baz' on element, but element was not a TestElement`);
    });

  });

  describe('toBeChecked', () => {
    it('should check if checked', () => {
      expect(toBeChecked(false, tester.checkbox).pass).toBe(true);
      tester.checkbox.uncheck();
      expect(toBeChecked(true, tester.checkbox).pass).toBe(true);
    });

    it('should return false if not checked', () => {
      tester.checkbox.uncheck();
      const result = toBeChecked(false, tester.checkbox);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to be checked, but was not`);
    });

    it('should return true if not checked and .not', () => {
      tester.checkbox.uncheck();
      const result = toBeChecked(true, tester.checkbox);
      expect(result.pass).toBeTruthy();
    });

    it('should return false if checked and .not', () => {
      const result = toBeChecked(true, tester.checkbox);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to be not checked, but was`);
    });

    it('should return false if no element', () => {
      const result = toBeChecked(false, null);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check if element was checked, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = toBeChecked(true, null);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check if element was checked, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = toBeChecked(false, 'hello');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check if element was checked, but element was not a TestInput`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = toBeChecked(true, 'hello');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check if element was checked, but element was not a TestInput`);
    });

  });

  describe('toHaveSelectedIndex', () => {
    it('should check selected index on a select', () => {
      expect(toHaveSelectedIndex(false, tester.selectBox, 1).pass).toBe(true);
      expect(toHaveSelectedIndex(true, tester.selectBox, 0).pass).toBe(true);
    });

    it('should return false if wrong value', () => {
      const result = toHaveSelectedIndex(false, tester.selectBox, 0);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have selected index 0, but had 1`);
    });

    it('should return true if wrong value and .not', () => {
      const result = toHaveSelectedIndex(true, tester.selectBox, 0);
      expect(result.pass).toBeTruthy();
    });

    it('should return false if matching value and .not', () => {
      const result = toHaveSelectedIndex(true, tester.selectBox, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have selected index 1, but had 1`);
    });

    it('should return false if no element', () => {
      const result = toHaveSelectedIndex(false, null, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected index 1 on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = toHaveSelectedIndex(true, null, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected index 1 on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = toHaveSelectedIndex(false, tester.textArea, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected index 1 on element, but element was not a TestSelect`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = toHaveSelectedIndex(true, tester.textArea, 1);
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected index 1 on element, but element was not a TestSelect`);
    });
  });

  describe('toHaveSelectedValue', () => {
    it('should check selected value on a select', () => {
      expect(toHaveSelectedValue(false, tester.selectBox, 'a').pass).toBe(true);
      expect(toHaveSelectedValue(true, tester.selectBox, 'b').pass).toBe(true);
    });

    it('should return false if wrong value', () => {
      const result = toHaveSelectedValue(false, tester.selectBox, 'b');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have selected value 'b', but had 'a'`);
    });

    it('should return true if wrong value and .not', () => {
      const result = toHaveSelectedValue(true, tester.selectBox, 'b');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if matching value and .not', () => {
      const result = toHaveSelectedValue(true, tester.selectBox, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have selected value 'a', but had 'a'`);
    });

    it('should return false if no element', () => {
      const result = toHaveSelectedValue(false, null, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected value 'a' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = toHaveSelectedValue(true, null, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected value 'a' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = toHaveSelectedValue(false, tester.textArea, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected value 'a' on element, but element was not a TestSelect`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = toHaveSelectedValue(true, tester.textArea, 'a');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected value 'a' on element, but element was not a TestSelect`);
    });
  });

  describe('toHaveSelectedLabel', () => {
    it('should check selected label on a select', () => {
      expect(toHaveSelectedLabel(false, tester.selectBox, 'A').pass).toBe(true);
      expect(toHaveSelectedLabel(true, tester.selectBox, 'B').pass).toBe(true);
    });

    it('should return false if wrong label', () => {
      const result = toHaveSelectedLabel(false, tester.selectBox, 'B');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have selected label 'B', but had 'A'`);
    });

    it('should return true if wrong label and .not', () => {
      const result = toHaveSelectedLabel(true, tester.selectBox, 'b');
      expect(result.pass).toBeTruthy();
    });

    it('should return false if matching label and .not', () => {
      const result = toHaveSelectedLabel(true, tester.selectBox, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have selected label 'A', but had 'A'`);
    });

    it('should return false if no element', () => {
      const result = toHaveSelectedLabel(false, null, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected label 'A' on element, but element was falsy`);
    });

    it('should return false if no element and .not too', () => {
      const result = toHaveSelectedLabel(true, null, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected label 'A' on element, but element was falsy`);
    });

    it('should return false if element of wrong type', () => {
      const result = toHaveSelectedLabel(false, tester.textArea, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected label 'A' on element, but element was not a TestSelect`);
    });

    it('should return false if element of wrong type and .not too', () => {
      const result = toHaveSelectedLabel(true, tester.textArea, 'A');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check selected label 'A' on element, but element was not a TestSelect`);
    });
  });
});
