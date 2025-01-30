import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestInput } from './test-input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideAutomaticChangeDetection } from './providers';

@Component({
  template: `
    <form>
      <input id="t1" [formControl]="t1" (input)="onInput()" />
      <input type="checkbox" value="a" [formControl]="c1" id="c1" (change)="onChange()" />
      <input type="checkbox" value="b" [formControl]="c2" id="c2" (change)="onChange()" />
      <input type="radio" [formControl]="r" name="r" id="r1" value="x" (change)="onRadioChange()" />
      <input type="radio" [formControl]="r" name="r" id="r2" value="y" (change)="onRadioChange()" />
      <input id="t2" [formControl]="t2" />
      <span id="text">{{ t1.value }}</span>
      <span id="c1Checked">{{ c1.value }}</span>
      <span id="c2Checked">{{ c2.value }}</span>
      <span id="rValue">{{ r.value }}</span>
    </form>
  `,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
  t1 = new FormControl('hello');
  t2 = new FormControl('');
  c1 = new FormControl(false);
  c2 = new FormControl(true);
  r = new FormControl('y');

  constructor() {
    this.t2.disable();
  }

  onInput() {}
  onChange() {}
  onRadioChange() {}
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

  get text() {
    return this.element('#text');
  }

  get c1Checked() {
    return this.element('#c1Checked');
  }

  get c2Checked() {
    return this.element('#c2Checked');
  }

  get rValue() {
    return this.element('#rValue');
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
describe('TestInput', () => {
  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tester = new TestComponentTester();
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.textInput instanceof TestInput).toBe(true);
  });

  it('should expose the value property', () => {
    expect(tester.textInput.value).toBe('hello');
    expect(tester.uncheckedCheckbox.value).toBe('a');
    expect(tester.checkedCheckbox.value).toBe('b');
    expect(tester.uncheckedRadio.value).toBe('x');
  });

  it('should fill an input with new text', () => {
    spyOn(tester.componentInstance, 'onInput');
    spyOn(tester, 'change').and.callThrough();

    tester.textInput.fillWith('goodbye');

    expect(tester.textInput.value).toBe('goodbye');
    expect(tester.text.nativeElement.textContent).toBe('goodbye');
    expect(tester.componentInstance.onInput).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should check a checkbox', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    tester.uncheckedCheckbox.check();

    expect(tester.uncheckedCheckbox.checked).toBe(true);
    expect(tester.c1Checked.textContent).toBe('true');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should uncheck a checkbox', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    tester.checkedCheckbox.uncheck();

    expect(tester.checkedCheckbox.checked).toBe(false);
    expect(tester.c2Checked.textContent).toBe('false');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should check a radio', () => {
    spyOn(tester.componentInstance, 'onRadioChange');
    spyOn(tester, 'change').and.callThrough();

    tester.uncheckedRadio.check();

    expect(tester.uncheckedRadio.checked).toBe(true);
    expect(tester.checkedRadio.checked).toBe(false);
    expect(tester.rValue.textContent).toBe('x');
    expect(tester.componentInstance.onRadioChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should uncheck a radio', () => {
    spyOn(tester.componentInstance, 'onRadioChange');
    spyOn(tester, 'change').and.callThrough();

    tester.checkedRadio.uncheck();

    expect(tester.checkedRadio.checked).toBe(false);
    expect(tester.componentInstance.onRadioChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should expose the disabled property', () => {
    expect(tester.textInput.disabled).toBe(false);
    expect(tester.disabledInput.disabled).toBe(true);
  });
});
/* eslint-enable @typescript-eslint/no-floating-promises */

describe('TestInput in automatic mode', () => {
  let tester: TestComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideAutomaticChangeDetection()]
    });
    tester = new TestComponentTester();
    await tester.change();
  });

  it('should fill an input with new text', async () => {
    spyOn(tester.componentInstance, 'onInput');
    spyOn(tester, 'change').and.callThrough();

    await tester.textInput.fillWith('goodbye');

    expect(tester.textInput.value).toBe('goodbye');
    expect(tester.text.nativeElement.textContent).toBe('goodbye');
    expect(tester.componentInstance.onInput).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should check a checkbox', async () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    await tester.uncheckedCheckbox.check();

    expect(tester.uncheckedCheckbox.checked).toBe(true);
    expect(tester.c1Checked.textContent).toBe('true');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should uncheck a checkbox', async () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    await tester.checkedCheckbox.uncheck();

    expect(tester.checkedCheckbox.checked).toBe(false);
    expect(tester.c2Checked.textContent).toBe('false');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should check a radio', async () => {
    spyOn(tester.componentInstance, 'onRadioChange');
    spyOn(tester, 'change').and.callThrough();

    await tester.uncheckedRadio.check();

    expect(tester.uncheckedRadio.checked).toBe(true);
    expect(tester.checkedRadio.checked).toBe(false);
    expect(tester.rValue.textContent).toBe('x');
    expect(tester.componentInstance.onRadioChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should uncheck a radio', async () => {
    spyOn(tester.componentInstance, 'onRadioChange');
    spyOn(tester, 'change').and.callThrough();

    await tester.checkedRadio.uncheck();

    expect(tester.checkedRadio.checked).toBe(false);
    expect(tester.componentInstance.onRadioChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });
});
