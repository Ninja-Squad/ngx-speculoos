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

  it('should check for a class', () => {
    expect(tester.div).toHaveClass('foo');
    expect(tester.div).not.toHaveClass('baz');

    const matcher = speculoosMatchers.toHaveClass(undefined, undefined);

    // missing class
    let result = matcher.compare(tester.div, 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected element to have class 'baz', but had 'foo, bar'`);

    result = matcher.negativeCompare(tester.div, 'foo');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected element to not have class 'foo', but had 'foo, bar'`);

    // no class
    result = matcher.compare(tester.none, 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected element to have class 'baz', but had none`);

    // null element
    result = matcher.compare(null, 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected to check class 'baz' on element, but element was falsy`);

    // not a TestElement
    result = matcher.compare('hello', 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected to check class 'baz' on element, but element was not a TestElement`);
  });

  it('should check for a value', () => {
    expect(tester.name).toHaveValue('Hello');
    expect(tester.name).not.toHaveValue('baz');

    // works with TestTextArea
    expect(tester.textArea).toHaveValue('Hi');

    const matcher = speculoosMatchers.toHaveValue(undefined, undefined);

    // wrong value
    let result = matcher.compare(tester.name, 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected element to have value 'baz', but had value 'Hello'`);

    result = matcher.negativeCompare(tester.name, 'baz');
    expect(result.pass).toBeTruthy();
    expect(result.message).toBe(`Expected element to not have value 'baz', but had value 'Hello'`);

    // null element
    result = matcher.compare(null, 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected to check value 'baz' on element, but element was falsy`);

    // not a TestInput
    result = matcher.compare('hello', 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected to check value 'baz' on element, but element was not a TestInput or a TestTextArea`);
  });
});
