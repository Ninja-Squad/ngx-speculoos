import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTester } from './component-tester';
import { speculoosMatchers } from './matchers';

@Component({
  template: `
    <div id="classes" class="foo bar">Hello</div>
    <div id="none">Hello</div>
    <input id="name" [value]="name"/>
    <textarea>Hi</textarea>
  `
})
class TestComponent {
  name = 'Hello';
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

  get textArea() {
    return this.textarea('textarea');
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
      // missing class
      let result = matcher.compare(tester.div, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have class 'baz', but had 'foo, bar'`);

      result = matcher.negativeCompare(tester.div, 'foo');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to not have class 'foo', but had 'foo, bar'`);

    });

    it('should handle no class', () => {
      // no class
      let result = matcher.compare(tester.none, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have class 'baz', but had none`);

      result = matcher.negativeCompare(tester.none, 'baz');
      expect(result.pass).toBeTruthy();
    });

    it('should handle no element', () => {
      // null element
      let result = matcher.compare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was falsy`);

      result = matcher.negativeCompare(null, 'baz');
      expect(result.pass).toBeTruthy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was falsy`);
    });

    it('should handle element of wrong type', () => {
      // not a TestElement
      let result = matcher.compare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check class 'baz' on element, but element was not a TestElement`);

      result = matcher.negativeCompare('hello', 'baz');
      expect(result.pass).toBeTruthy();
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
      // wrong value
      let result = matcher.compare(tester.name, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected element to have value 'baz', but had value 'Hello'`);

      result = matcher.negativeCompare(tester.name, 'baz');
      expect(result.pass).toBeTruthy();
      expect(result.message).toBe(`Expected element to not have value 'baz', but had value 'Hello'`);
    });

    it('should handle no element', () => {
      // null element
      let result = matcher.compare(null, 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was falsy`);

      result = matcher.negativeCompare(null, 'baz');
      expect(result.pass).toBeTruthy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was falsy`);
    });

    it('should handle element of wrong type', () => {
      // not a TestElement
      let result = matcher.compare('hello', 'baz');
      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was neither a TestInput nor a TestTextArea`);

      result = matcher.negativeCompare('hello', 'baz');
      expect(result.pass).toBeTruthy();
      expect(result.message).toBe(`Expected to check value 'baz' on element, but element was neither a TestInput nor a TestTextArea`);
    });

  });
});
