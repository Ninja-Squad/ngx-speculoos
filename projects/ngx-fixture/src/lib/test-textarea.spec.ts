import { Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestTextArea } from './test-textarea';

@Component({
  template: `
    <textarea id="t1" value="hello" (input)="onInput()">hello</textarea>
  `
})
class TestComponent {
  onInput() {}
  onChange() {}
}

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get textBox() {
    return this.textarea('#t1');
  }
}

describe('TestTextArea', () => {
  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ]
    });
    tester = new TestComponentTester();
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.textBox instanceof TestTextArea).toBe(true);
  });

  it('should expose the value property', () => {
    expect(tester.textBox.value).toBe('hello');
  });

  it('should fill with new text', () => {
    spyOn(tester.componentInstance, 'onInput');
    spyOn(tester, 'detectChanges');

    tester.textBox.fillWith('goodbye');

    expect(tester.textBox.value).toBe('goodbye');
    expect(tester.componentInstance.onInput).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });
});
