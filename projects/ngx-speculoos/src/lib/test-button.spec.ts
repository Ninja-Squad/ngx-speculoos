import { Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestButton } from './test-button';

@Component({
  template: `
    <button id="b1">Test</button>
    <button id="b2" disabled>Test</button>
  `,
  standalone: true
})
class TestComponent {}

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get enabledButton() {
    return this.button('#b1');
  }

  get disabledButton() {
    return this.button('#b2');
  }
}

describe('TestButton', () => {
  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tester = new TestComponentTester();
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.enabledButton instanceof TestButton).toBe(true);
  });

  it('should expose the disabled property', () => {
    expect(tester.enabledButton.disabled).toBe(false);
    expect(tester.disabledButton.disabled).toBe(true);
  });
});
