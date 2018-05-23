import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTester } from './component-tester';
import { elementMatchers } from './matchers';

@Component({
  template: `
    <div id="classes" class="foo bar">Hello</div>
    <div id="none">Hello</div>
  `
})
class TestComponent {
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
}

describe('Custom matchers', () => {

  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TestComponent] });
    tester = new TestComponentTester();
    tester.detectChanges();
    jasmine.addMatchers(elementMatchers);
  });

  it('should check for a class', () => {
    expect(tester.div).toHaveClass('foo');
    expect(tester.div).not.toHaveClass('baz');

    const matcher = elementMatchers.toHaveClass(undefined, undefined);

    // missing class
    let result = matcher.compare(tester.div, 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected element to have class 'baz', but had 'foo, bar'`);

    // no class
    result = matcher.compare(tester.none, 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected element to have class 'baz', but had none`);

    // null element
    result = matcher.compare(null, 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected element to have class 'baz', but element was falsy`);

    // not a TestElement
    result = matcher.compare('hello', 'baz');
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(`Expected element to have class 'baz', but element was not a TestElement`);
  });
});
