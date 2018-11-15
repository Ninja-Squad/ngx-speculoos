import { Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestInput } from './test-input';

@Component({
  template: `
    <form>
      <input id="t1" value="hello" (input)="onInput()"/>
      <input type="checkbox" id="c1" value="a" (change)="onChange()"/>
      <input type="checkbox" id="c2" value="b" checked (change)="onChange()"/>
      <input type="radio" name="r" id="r1" value="x" (change)="onChange()"/>
      <input type="radio" name="r" id="r2" value="y" checked (change)="onChange()"/>
      <input id="t2" disabled />
    </form>
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

  get textInput() {
    return this.input('#t1');
  }

  get uncheckedCheckbox() {
    return this.input('#c1');
  }

  get checkedCheckbox() {
    return this.input('#c2');
  }

  get uncheckedRadio() {
    return this.input('#r1');
  }

  get checkedRadio() {
    return this.input('#r2');
  }

  get disabledInput() {
    return this.input('#t2');
  }
}

describe('TestInput', () => {
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
    expect(tester.textInput instanceof TestInput).toBe(true);
  });

  it('should expose the value property', () => {
    expect(tester.textInput.value).toBe('hello');
    expect(tester.uncheckedCheckbox.value).toBe('a');
    expect(tester.uncheckedRadio.value).toBe('x');
  });

  it('should fill an input with new text', () => {
    spyOn(tester.componentInstance, 'onInput');
    spyOn(tester, 'detectChanges');

    tester.textInput.fillWith('goodbye');

    expect(tester.textInput.value).toBe('goodbye');
    expect(tester.componentInstance.onInput).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });

  it('should check a checkbox', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'detectChanges');

    tester.uncheckedCheckbox.check();

    expect(tester.uncheckedCheckbox.checked).toBe(true);
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });

  it('should uncheck a checkbox', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'detectChanges');

    tester.checkedCheckbox.uncheck();

    expect(tester.checkedCheckbox.checked).toBe(false);
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });

  it('should check a radio', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'detectChanges');

    tester.uncheckedRadio.check();

    expect(tester.uncheckedRadio.checked).toBe(true);
    expect(tester.checkedRadio.checked).toBe(false);
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });

  it('should uncheck a radio', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'detectChanges');

    tester.checkedRadio.uncheck();

    expect(tester.checkedRadio.checked).toBe(false);
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });

  it('should expose the disabled property', () => {
    expect(tester.textInput.disabled).toBe(false);
    expect(tester.disabledInput.disabled).toBe(true);
  });
});
